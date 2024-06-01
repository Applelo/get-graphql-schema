<script lang="ts" setup>
const props = defineProps<{
  rawSchema: string
  loading: boolean
}>()

const body = computed(() => {
  return {
    schema: props.rawSchema,
  }
})
const selected = ref(0)
const { data: rawTs, execute: executeGqlToTs } = await useFetch('/api/gql-to-ts', {
  method: 'POST',
  body,
  immediate: false,
  server: false,
  watch: false,
})

const items = [{
  label: 'Schema',
}, {
  label: 'Typescript',
}]

const toast = useToast()
const { copy, isSupported: copySupport } = useClipboard()

function codeToClipboard() {
  if (selected.value === 0) {
    copy(props.rawSchema)
    toast.add({
      title: 'Copied',
      description: 'The schema is in your clipboard!',
    })
  }
  else if (selected.value === 1 && rawTs.value) {
    copy(rawTs.value)
    toast.add({
      title: 'Copied',
      description: 'The TypeScript code is in your clipboard!',
    })
  }
}

watch(selected, async () => {
  if (selected.value !== 1 || rawTs.value)
    return
  await executeGqlToTs()
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
    <LazyShiki
      v-if="rawSchema && selected === 0"
      lang="graphql"
      class="max-h-screen overflow-auto"
      :code="rawSchema"
    />
    <LazyShiki
      v-else-if="rawTs && selected === 1"
      class="max-h-screen overflow-auto"
      lang="ts"
      :code="rawTs"
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
