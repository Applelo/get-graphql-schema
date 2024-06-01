<template>
  <footer class="mt-auto pt-8">
    <UDivider class="mb-2">
      <ULink to="https://github.com/Applelo/get-graphql-schema">
        <span class="sr-only">
          See the project on GitHub
        </span>
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
                Inspired by
                <ULink
                  class="text-primary"
                  to="https://github.com/prisma-labs/get-graphql-schema"
                >
                  get-graphql-schema
                </ULink> from PrismaLab
              </li>
              <li>
                <ULink to="https://nuxt.com/" class="text-primary">
                  Nuxt 3
                </ULink>
                and
                <ULink to="https://ui.nuxt.com/" class="text-primary">
                  UI
                </ULink>
                by Nuxt Team
              </li>
            </ul>
          </div>
        </template>
      </UPopover>
    </div>
  </footer>
</template>
