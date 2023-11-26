<script lang="ts" setup>
import type { HighlighterCore } from 'shikiji/core'

const props = defineProps<{
  rawSchema: string
  loading: boolean
}>()

const toast = useToast()
let shiki: HighlighterCore
const { copy, isSupported: copySupport } = useClipboard()

async function getShiki() {
  const shikiji = await import('shikiji/core')
  const shikijiWasm = await import('shikiji/wasm')

  shiki = await shikiji.getHighlighterCore({
    themes: [
      import('shikiji/themes/dracula.mjs'),
    ],
    langs: [
      import('shikiji/langs/typescript.mjs'),
      import('shikiji/langs/graphql.mjs'),
    ],
    loadWasm: shikijiWasm.getWasmInlined,
  })
}

function schemaToClipboard() {
  copy(props.rawSchema)
  toast.add({ title: 'Copied', description: 'The schema is in your clipboard!' })
}

const htmlSchema = computed(
  () => shiki.codeToHtml(
    props.rawSchema,
    {
      lang: 'graphql',
      theme: 'dracula',
    },
  ),
)

onMounted(() => {
  getShiki()
})
</script>

<template>
  <UCard class="mt-12 mb-8">
    <template v-if="rawSchema" #header>
      <div class="flex justify-end">
        <UTooltip text="Copy to your clipboard">
          <UButton
            v-if="copySupport"
            color="gray"
            square
            icon="i-heroicons-clipboard-document"
            @click="schemaToClipboard"
          />
        </UTooltip>
      </div>
    </template>
    <div v-if="rawSchema" class="overflow-auto max-h-screen" v-html="htmlSchema" />
    <div v-else class="text-center flex align-center justify-center">
      Loading...
    </div>
  </UCard>
</template>

<style>
.shiki {
  background-color: transparent!important;
}
</style>
