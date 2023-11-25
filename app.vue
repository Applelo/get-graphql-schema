<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive<Record<string, string | undefined>>({
  url: undefined,
})

const selected = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.url) errors.push({ path: 'url', message: 'Required' })

  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}

const headerValuePlaceholder = computed(
  () => (Math.random() + 1).toString(36).substring(2)
)
</script>

<template>
  <main class="bg-gray-900">
    <div class="max-w-5xl mx-auto min-h-screen px-4 py-8 flex flex-col">
      <header class="mb-4">
        <h1 class="text-white text-xl text-center mb-5">
          Get a
          <ULink to="https://graphql.org/" class="text-primary inline-flex items-center justify-center">
            <UIcon name="i-simple-icons-graphql" class="text-lg mr-1" />
            GraphQL
          </ULink> Schema
        </h1>
        <p class="text-white text-sm text-center">
          Put your URL below and let's find this GraphQL schema for you
        </p>
      </header>
      <UForm class="max-w-lg w-full mx-auto" :validate="validate" :state="state" @submit="onSubmit">
        <UInput
          class="mb-4"
          type="url"
          name="url"
          placeholder="https://my-api.com/graphql"
        />

        <UCheckbox v-model="selected" class="mb-2">
          <template #label>
            <span class="text-white">
              Add authorization header
            </span>
            </template>

        </UCheckbox>
        <div v-if="selected" class="relative">
          <p class="text-white text-sm mb-1 lg:mb-0 lg:absolute lg:-translate-x-full lg:pr-4 lg:top-1/2 lg:-translate-y-1/2">
            Header (optional)
          </p>
          <div class="grid sm:grid-cols-2 gap-3">
            <UInput icon="i-heroicons-key" name="header-name" placeholder="Authorization" />
            <UInput name="header-value" :placeholder="headerValuePlaceholder" />
          </div>
        </div>
        <UButton block type="submit" class="mt-4">
          Get my schema
        </UButton>
      </UForm>
      <footer class="mt-auto">
        <UDivider class="mb-2">
          <ULink to="https://github.com/Applelo/get-graphql-schema">
            <UIcon name="i-simple-icons-github" class="text-white text-2xl" />
          </ULink>
        </UDivider>
        <div class="flex justify-between gap-4">
          <ULink class="text-white text-sm" to="https://github.com/Applelo">
            Developed by <span class="text-primary">Applelo</span>
          </ULink>
          <UPopover mode="hover">
            <UButton
              label="Credits"
              color="gray"
              size="xs"
              leading-icon="i-heroicons-heart"
            />

            <template #panel>
              <div class="p-4">
                <ul>
                  <li>
                    <ULink
                    class="text-primary"
                      to="https://github.com/prisma-labs/get-graphql-schema"
                    >
                    get-graphql-schema
                  </ULink> by PrismaLab
                  </li>
                  <li>
                    <ULink to="https://nuxt.com/" class="text-primary">Nuxt 3</ULink> and <ULink to="https://ui.nuxt.com/" class="text-primary">UI</ULink> by Nuxt Team
                  </li>
                </ul>
              </div>
            </template>

          </UPopover>

        </div>
      </footer>
    </div>
  </main>
</template>
