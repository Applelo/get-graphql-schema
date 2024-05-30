import { parse } from 'graphql'
import { codegen } from '@graphql-codegen/core'
import * as typescriptPlugin from '@graphql-codegen/typescript'
import * as typescriptOperation from '@graphql-codegen/typescript-operations'

export default defineEventHandler(async (event) => {
  const { schema } = await readBody(event)

  const plugins = [
    typescriptPlugin,
    typescriptOperation,
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
