<script lang="ts" setup>
import { getHighlighterCore } from 'shikiji'
import { getWasmInlined } from 'shikiji/wasm'

const props = defineProps<{
  rawSchema: string
  loading: boolean
}>()

// const rawSchema = useRawSchema()

const shiki = await getHighlighterCore({
  themes: [
    import('shikiji/themes/dracula.mjs')
  ],
  langs: [
    import('shikiji/langs/typescript.mjs'),
    import('shikiji/langs/graphql.mjs'),
  ],
  loadWasm: getWasmInlined
})

const toast = useToast()
const { copy, isSupported: copySupport } = useClipboard()

function schemaToClipboard() {
  copy(props.rawSchema)
  toast.add({ title: 'Copied', description: 'The schema is in your clipboard!' })
}

const htmlSchema = computed(
  () => shiki.codeToHtml(
    props.rawSchema,
    {
      lang: 'graphql',
      theme: 'dracula'
    }
  )
)
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
