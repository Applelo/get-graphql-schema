import type {
  IntrospectionQuery,
} from 'graphql/utilities'
import {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
} from 'graphql/utilities'

export interface SchemaOptions {
  url?: string
  headerName?: string
  headerValue?: string
}

export async function getSchema(opts: SchemaOptions) {
  if (!opts.url)
    return
  const introspectionQuery = getIntrospectionQuery()
  const headers: Record<string, string> = {}

  if (opts.headerName && opts.headerValue)
    headers[opts.headerName] = opts.headerValue

  const { data } = await $fetch<{ data: IntrospectionQuery }>(opts.url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: introspectionQuery }),
  })

  const schema = buildClientSchema(data)
  return printSchema(schema)
}
