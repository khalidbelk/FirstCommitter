<script lang="ts" setup>
import { ref } from 'vue'
import { getFirstCommit } from '../server/firstCommit'
import { formatTimestamp } from '../server/utils'

const pending = ref(false)
const repositoryUrl = ref('')
const firstCommit = ref<any | null>(null)

const fetchData = async (repositoryUrl: string) => {
  try {
    firstCommit.value = await getFirstCommit(repositoryUrl)
    return { firstCommit: firstCommit, error: null }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
</script>

<template>
  <Transition>
    <div class="flex w-full dark:bg-neutral-900">
      <div class="w-full h-screen relative p-4">
        <div
          class="absolute w-max space-y-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div class="flex space-x-4">
            <div
              class="w-fit rounded-lg p-4 space-y-4 border-2 border-neutral-200 dark:border-neutral-700"
            >
              <label
                for="repositoryUrl"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Repository's URL
              </label>
              <div
                class="w-max space-y-4 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 relative mt-2 rounded-md shadow-sm"
              >
                <div class="flex space-x-2">
                  <input
                    type="text"
                    v-model="repositoryUrl"
                    @keydown.enter.prevent="fetchData(repositoryUrl)"
                    name="repositoryUrl"
                    id="repositoryUrl"
                    class="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="github.com/torvalds/linux"
                  />
                  <div class="absolute inset-y-0 left-0 flex items-center">
                    <span class="text-gray-500 sm:text-sm"
                      ><Icon name="heroicons-outline:globe-alt" size="24"
                    /></span>
                  </div>
                  <button
                    type="button"
                    @click.prevent="() => fetchData(repositoryUrl)"
                    class="w-12 justify-center items-center bg-black hover:bg-slate-900 text-white py-1 px-3 cursor-pointer rounded-lg"
                  >
                    <Icon
                      v-if="pending"
                      name="tabler:loader-2"
                      size="24"
                      class="animate-spin"
                    />
                    <Icon v-else name="tabler:arrow-right" size="24" />
                  </button>
                </div>
              </div>
              <div v-if="firstCommit">
                <label
                  for="repositoryUrl"
                  class="flex justify-center pt-4 text-sm font-medium leading-6 text-green-500"
                  >Done !
                </label>
              </div>
            </div>
          </div>
          <div v-if="firstCommit" class="flex space-x-4">
            <div
              class="w-fit rounded-lg p-4 space-y-4 border-2 border-neutral-200 dark:border-neutral-700"
            >
              <div class="flex justify-between items-center">
                <label
                  for="firstCommit"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >{{
                    firstCommit ? firstCommit.commit.author.name : 'Loading...'
                  }}
                </label>
                <p class="text-black text-xs">
                  {{ formatTimestamp(firstCommit.commit.author.date) }}
                </p>
              </div>
              <div
                class="w-max space-y-4 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 relative mt-2 rounded-md shadow-sm"
              >
                <div clas="flex justify-between items-end">
                  <p class="text-gray-600 text-xs">
                    <a target="_blank" :href="firstCommit.html_url">{{
                      firstCommit
                        ? `${firstCommit.commit.message.slice(0, 64)}${firstCommit.commit.message.length > 64 ? '...' : ''}`
                        : 'Loading...'
                    }}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
