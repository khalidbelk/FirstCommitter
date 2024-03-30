<script setup lang="ts">
useSeoMeta({
  title: 'First Committer',
  ogTitle: 'First Committer',
  description: 'Find the first commit of any public GitHub repository 🕵️‍♂️.',
  ogDescription:
    'A tool that lets you find the first commit(ter) behind any public GitHub repository.',
  ogImage:
    'https://raw.githubusercontent.com/khalidbelk/FirstCommitter/main/assets/logo/LogoText.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
