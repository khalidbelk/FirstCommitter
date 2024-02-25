<script lang="ts" setup></script>

<template>
  <nav
    class="max-w-7xl h-20 px-4 mx-auto flex justify-between items-center z-10"
  >
    <div class="flex items-center">
      <ul class="flex items-center">
        <li
          class="ml-4 text-sm text-gray-700 hover:text-gray-300 font-semibold"
        >
          <NuxtLink to="/about">About</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex items-center">
      <NuxtLink to="/">
        <img src="/assets/logo/lightmode_icon.png" alt="logo" width="55" />
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
          class="text-gray-700 group-hover:text-gray-900"
        />
      </NuxtLink>
    </div>
  </nav>
</template>
