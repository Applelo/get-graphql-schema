export default defineEventHandler(async (event) => {
  const { schema } = await readBody(event)

  const { codegen } = await import('@graphql-codegen/core')
  const { parse } = await import('graphql')

  const graphqlTypescript = await import('@graphql-codegen/typescript')
  const graphqlTypescriptOperations = await import('@graphql-codegen/typescript-operations')
  const plugins = [
    graphqlTypescript,
    graphqlTypescriptOperations,
  ]
  const pluginMap: Record<number, any> = {}

  plugins.forEach((plugin, i) => {
    pluginMap[i + 1] = plugin
  })

  const result = await codegen({
    filename: 'a.dts',
    schema: parse(schema),
    documents: [],
    plugins: plugins.map((_plugin, i) => ({
      [i + 1]: {},
    })),
    pluginMap,
    config: {},
  })

  return result
})
