<script setup lang="ts">
import type { FormError } from '#ui/types'

const state = reactive<SchemaOptions>({
  url: undefined,
  headers: [],
})

const rawSchema = ref('')
const errorSchema = ref<Error | null>(null)
const loading = ref(false)

function validate(state: any): FormError[] {
  const errors = []
  if (!state.url)
    errors.push({ path: 'url', message: 'Required' })

  // if (hasHeader.value) {
  // if (!state.headerName)
  //   errors.push({ path: 'headerName', message: 'Required' })

  // if (!state.headerValue)
  //   errors.push({ path: 'headerValue', message: 'Required' })
  // }

  return errors
}

async function onSubmit() {
  rawSchema.value = ''
  loading.value = true
  const { data, error } = await useAsyncData(() => getSchema(state))
  errorSchema.value = error.value
  if (!data.value)
    return loading.value = false

  rawSchema.value = data.value
  loading.value = false
}

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <AppHead />

  <main class="bg-gray-900">
    <div class="max-w-5xl mx-auto min-h-screen px-4 py-8 flex flex-col">
      <Header />

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

        <div v-for="item, index in state.headers" :key="index" class="flex gap-3 mb-2">
          <UFormGroup name="headerName" class="grow">
            <UInput
              v-model="item[0]"
              aria-label="Header name"
              placeholder="Key"
            />
          </UFormGroup>
          <UFormGroup name="headerValue" class="grow">
            <UInput
              v-model="item[1]"
              aria-label="Header value"
              placeholder="Value"
            />
          </UFormGroup>
          <UButton
            icon="i-heroicons-minus"
            color="white"
            square
            variant="solid"
            aria-label="Remove"
            @click="state.headers.splice(index, 1)"
          />
        </div>

        <UButton
          icon="i-heroicons-plus"
          color="white"
          variant="solid"
          @click="state.headers.push(['', ''])"
        >
          Add Header
        </UButton>

        <UButton :loading="loading" block type="submit" class="mt-5">
          Get my schema
        </UButton>
      </UForm>

      <UAlert
        v-if="errorSchema"
        class="mt-12 mb-8"
        color="primary"
        variant="solid"
        title="Error"
        :description="errorSchema.message"
      />
      <LazyResult
        v-else-if="rawSchema || loading"
        :loading="loading"
        :raw-schema="rawSchema"
      />

      <Footer v-once />
    </div>
  </main>
  <UNotifications />
</template>
