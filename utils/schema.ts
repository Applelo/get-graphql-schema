import type {
  IntrospectionQuery,
} from 'graphql/utilities'

export interface SchemaOptions {
  url?: string
  headers: string[][]
}

export async function getSchema(opts: SchemaOptions) {
  if (!opts.url)
    return
  const { getIntrospectionQuery } = await import('graphql/utilities/getIntrospectionQuery')
  const introspectionQuery = getIntrospectionQuery()

  const headers: Record<string, string> = {}
  opts.headers.forEach((header) => {
    headers[header[0]] = header[1]
  })

  const { data } = await $fetch<{ data: IntrospectionQuery }>(
    opts.url,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: introspectionQuery }),
    },
  )

  const { buildClientSchema } = await import('graphql/utilities/buildClientSchema')
  const schema = buildClientSchema(data)
  const { printSchema } = await import('graphql/utilities/printSchema')
  return printSchema(schema)
}

export async function transformSchemaToTypescript(schema: string) {
  const { codegen } = await import('@graphql-codegen/core')
  const { parse } = await import('graphql')
  const graphqlTypescript = await import('@graphql-codegen/typescript')
  const graphqlTypescriptOperations = await import('@graphql-codegen/typescript-operations')

  const pluginMap: Record<number, any> = {}
  const plugins = [
    graphqlTypescript.default,
    graphqlTypescriptOperations.default,
  ]

  plugins.forEach((plugin, i) => {
    pluginMap[i + 1] = plugin
  })

  const result = await codegen({
    filename: 'a.dts',
    schema: parse(schema),
    // @ts-expect-error Woo
    plugins,
    pluginMap,
  })

  return result
}
