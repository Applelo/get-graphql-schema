<script lang="ts" setup>
const props = defineProps<{
  rawSchema: string
  loading: boolean
}>()
const selected = ref(0)
const rawTs = ref('')

const items = [{
  label: 'Schema',
}, {
  label: 'Typescript',
}]

const toast = useToast()
const { copy, isSupported: copySupport } = useClipboard()

const shikiji = await import('shikiji/core')
const shikijiWasm = await import('shikiji/wasm')
const shiki = await shikiji.getHighlighterCore({
  themes: [
    import('shikiji/themes/dracula.mjs'),
  ],
  langs: [
    import('shikiji/langs/typescript.mjs'),
    import('shikiji/langs/graphql.mjs'),
  ],
  loadWasm: shikijiWasm.getWasmInlined,
})

function codeToClipboard() {
  if (selected.value === 0) {
    copy(props.rawSchema)
    toast.add({
      title: 'Copied',
      description: 'The schema is in your clipboard!'
    })
  }
  else if (selected.value === 1 && rawTs.value) {
    copy(rawTs.value)
    toast.add({
      title: 'Copied',
      description: 'The TypeScript code is in your clipboard!'
    })
  }
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

const tsSchema = computed(
  () => shiki.codeToHtml(
    rawTs.value,
    {
      lang: 'typescript',
      theme: 'dracula',
    },
  ),
)

watch(selected, async () => {
  if (selected.value !== 1 || rawTs.value)
    return

  const res = await $fetch<string>('/api/gql-to-ts', {
    method: 'POST',
    body: {
      schema: props.rawSchema,
    },
  })

  if (res)
    rawTs.value = res
})
</script>

<template>
  <UCard class="mt-12 mb-8">
    <template v-if="rawSchema" #header>
      <div class="flex justify-between items-start gap-4">
        <UTabs v-model="selected" :items="items" />
        <UTooltip text="Copy to your clipboard">
          <UButton
            v-if="copySupport"
            color="gray"
            square
            icon="i-heroicons-clipboard-document"
            @click="codeToClipboard"
          />
        </UTooltip>
      </div>
    </template>
    <div
      v-if="rawSchema && selected === 0"
      class="max-h-screen overflow-auto"
      v-html="htmlSchema"
    />
    <div
      v-else-if="tsSchema && selected === 1"
      class="max-h-screen overflow-auto"
      v-html="tsSchema"
    />
    <div
      v-else
      class="text-center flex align-center justify-center"
    >
      Loading...
    </div>
  </UCard>
</template>

<style>
.shiki {
  background-color: transparent!important;
}
</style>
