<script setup lang="ts">
import type { FormError } from '#ui/types'

const state = reactive<SchemaOptions>({
  url: undefined,
  headerName: undefined,
  headerValue: undefined,
})

const hasHeader = ref(false)
const rawSchema = ref('')
const loading = ref(false)

function validate(state: any): FormError[] {
  const errors = []
  if (!state.url)
    errors.push({ path: 'url', message: 'Required' })

  if (hasHeader.value) {
    if (!state.headerName)
      errors.push({ path: 'headerName', message: 'Required' })

    if (!state.headerValue)
      errors.push({ path: 'headerValue', message: 'Required' })
  }

  return errors
}

async function onSubmit() {
  rawSchema.value = ''
  loading.value = true
  const { data } = await useAsyncData(() => getSchema(state))
  if (!data.value)
    return loading.value = false

  rawSchema.value = data.value
  loading.value = false
}

const headerValuePlaceholder = computed(
  () => (Math.random() + 1).toString(36).substring(2),
)
</script>

<template>
  <main class="bg-gray-900">
    <div class="max-w-5xl mx-auto min-h-screen px-4 py-8 flex flex-col">
      <Header v-once />

      <UForm
        class="max-w-lg w-full mx-auto"
        :validate="validate"
        :state="state"
        :validate-on="['submit']"
        @submit="onSubmit"
      >
        <UFormGroup name="url" class="mb-4">
          <UInput
            v-model="state.url"
            aria-label="GraphQL url"
            type="url"
            placeholder="https://my-api.com/graphql"
          />
        </UFormGroup>

        <UCheckbox v-model="hasHeader" class="mb-2">
          <template #label>
            <span class="text-white">
              Set an header
            </span>
          </template>
        </UCheckbox>
        <div v-if="hasHeader" class="relative">
          <div class="grid sm:grid-cols-2 gap-3">
            <UFormGroup name="headerName">
              <UInput
                v-model="state.headerName"
                aria-label="Header name"
                placeholder="Authorization"
              />
            </UFormGroup>
            <UFormGroup name="headerValue">
              <UInput
                v-model="state.headerValue"
                aria-label="Header value"
                :placeholder="headerValuePlaceholder"
              />
            </UFormGroup>
          </div>
        </div>
        <UButton :loading="loading" block type="submit" class="mt-4">
          Get my schema
        </UButton>
      </UForm>

      <LazyResult
      v-if="rawSchema || loading"
      :loading="loading"
      :raw-schema="rawSchema" />

      <Footer v-once />
    </div>
  </main>
  <UNotifications />
</template>
