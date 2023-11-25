<script lang="ts" setup>
const props = defineProps<{
  rawSchema: string
  htmlSchema: string
  loading: boolean
}>()

const toast = useToast()
// const keys = useMagicKeys()
// const commandC = keys['Option+Shift+C']
const { copy, isSupported: copySupport } = useClipboard()

function schemaToClipboard() {
  copy(props.rawSchema)
  toast.add({ title: 'Copied', description: 'The schema is in your clipboard!' })
}

// watch(commandC, (v) => {
//   if (v)
//     schemaToClipboard()
// })

// const copyIcon = computed(() => copied ? 'i-heroicons-clipboard-document-check' : 'i-heroicons-clipboard-document')
</script>

<template>
  <UCard v-if="htmlSchema || loading" class="mt-12 mb-8">
    <template v-if="htmlSchema" #header>
      <UTooltip text="Copy to your clipboard" :shortcuts="['⌥', '⇧', 'C']">
        <UButton
          v-if="copySupport"
          class="ml-auto"
          color="gray"
          square
          icon="i-heroicons-clipboard-document"
          @click="schemaToClipboard"
        />
      </UTooltip>
    </template>
    <div v-if="htmlSchema" class="overflow-auto max-h-screen" v-html="htmlSchema" />
    <div v-else class="text-center flex align-center justify-center">
      Loading...
    </div>
  </UCard>
</template>
