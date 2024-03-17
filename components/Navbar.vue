<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav class="h-20 mx-auto flex justify-between dark:bg-neutral-900">
    <div class="flex items-center ml-20">
      <ul class="flex items-center">
        <li
          class="ml-4 text-sm text-gray-700 hover:text-gray-300 font-semibold dark:text-white"
        >
          <NuxtLink to="/about">About</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex items-center">
      <NuxtLink to="/">
        <img
          v-if="isDark"
          src="/assets/logo/darkmode_icon.png"
          alt="logo"
          width="55"
        />
        <img
          v-if="!isDark"
          src="/assets/logo/lightmode_icon.png"
          alt="logo"
          width="55"
        />
      </NuxtLink>
    </div>
    <div class="flex items-center">
      <NuxtLink
        to="https://github.com/khalidbelk/FirstCommitter"
        target="_blank"
        class="group rounded-md w-8 h-8 hover:bg-gray-100"
      >
        <Icon
          name="mdi:github"
          size="30"
          class="text-gray-700 group-hover:text-gray-900 dark:text-white animate-pulse"
        />
      </NuxtLink>
      <Button
        @click="toggleDark()"
        :title="isDark ? 'Turn on Light Mode' : 'Turn on Dark Mode'"
      >
        <div v-if="isDark">
          <Icon
            name="heroicons:sun"
            size="20"
            class="text-gray-900 ml-10 mr-20 dark:text-white"
          />
        </div>
        <div v-if="!isDark">
          <Icon
            name="heroicons:moon"
            size="20"
            class="text-gray-900 ml-10 mr-20 dark:text-white"
          />
        </div>
      </Button>
    </div>
  </nav>
</template>
