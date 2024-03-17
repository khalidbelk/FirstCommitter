<script lang="ts" setup>
import { ref } from 'vue'
import { getFirstCommit } from '../server/firstCommit'
import { formatTimestamp } from '../server/utils'
import ToastNotification from '~/components/ToastNotification.vue'
import { useInputValidation } from '@/composables/inputUtils'
import { useToastNotification } from '@/composables/useToast'

const pending = ref(false)
const repositoryUrl = ref('github.com/ /')

const firstCommit = ref<any>('')
const status = ref<number>(0)

const validationError = ref(false)
const showRequired = ref(false)
const errorMessage = ref('')

const showToastStatus = ref(false)
const toastStatus = ref('')

const { onInput, validateInput, isValidUrl } = useInputValidation(
  repositoryUrl,
  validationError,
  showRequired,
  errorMessage
)
const { showToast } = useToastNotification(status, showToastStatus, toastStatus)

const fetchData = async (repositoryUrl: string) => {
  try {
    pending.value = true
    const { firstCommit: fetchedCommit, status: fetchedStatus } =
      await getFirstCommit(repositoryUrl)

    firstCommit.value = fetchedCommit
    status.value = fetchedStatus
    showToast()

    return { firstCommit, error: null }
  } catch (error) {
    toastStatus.value = 'error'
    showToastStatus.value = true
    console.error('Error fetching data:', error)
    throw error
  } finally {
    pending.value = false
  }
}

const isSubmitDisabled = computed(() => {
  return !repositoryUrl.value.trim()
})
</script>

<template>
  <Navbar />
  <Transition>
    <div class="flex w-full dark:bg-neutral-900">
      <div class="w-full h-screen relative p-4">
        <div
          class="absolute w-max space-y-4 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div class="flex space-x-4">
            <div
              class="w-fit rounded-lg p-8 space-y-4 border-2 border-neutral-200 dark:border-neutral-700"
            >
              <label
                for="repositoryUrl"
                class="dark:text-white block text-sm font-medium leading-6 text-gray-900"
                >Repository's URL
              </label>
              <div
                class="w-max space-y-4 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 relative mt-2 rounded-md shadow-sm"
              >
                <div class="flex space-x-2">
                  <input
                    type="text"
                    v-model="repositoryUrl"
                    @input="onInput"
                    @blur="validateInput"
                    @keydown.enter.prevent="
                      isSubmitDisabled || !isValidUrl(repositoryUrl)
                        ? null
                        : fetchData(repositoryUrl)
                    "
                    name="repositoryUrl"
                    id="repositoryUrl"
                    class="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 dark:bg-neutral-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="github.com/torvalds/linux"
                  />
                  <div class="absolute inset-y-0 left-0 flex items-center">
                    <span class="text-gray-500 sm:text-sm dark:text-white"
                      ><Icon name="heroicons-outline:globe-alt" size="24"
                    /></span>
                  </div>
                  <button
                    :disabled="isSubmitDisabled"
                    @click.prevent="
                      () => () => {
                        if (isValidUrl(repositoryUrl)) {
                          fetchData(repositoryUrl)
                        }
                      }
                    "
                    class="w-12 justify-center items-center bg-black dark:bg-amber-50 hover:bg-slate-900 text-white py-1 px-3 cursor-pointer rounded-lg"
                  >
                    <Icon
                      name="tabler:arrow-right"
                      class="dark:text-black"
                      size="24"
                    />
                  </button>
                </div>
              </div>
              <div v-if="showRequired">
                <span class="text-red-500 text-sm">{{ errorMessage }}</span>
              </div>
              <div v-if="showToastStatus">
                <ToastNotification
                  position="bottom-right"
                  group="br"
                  :severity="toastStatus"
                />
              </div>
            </div>
          </div>

          <div v-if="firstCommit || pending" class="w-full">
            <div
              class="w-fit rounded-lg p-4 space-y-4 border-2 border-neutral-200 dark:border-neutral-700"
            >
              <div v-if="pending" class="animate-pulse">
                <div class="flex justify-between items-start">
                  <div class="rounded-lg bg-slate-200 h-16 w-16"></div>
                  <div class="pl-5 mt-1">
                    <div class="h-3 mb-2 w-32 bg-slate-200 rounded"></div>
                    <div class="h-3 w-24 bg-slate-200 rounded"></div>
                  </div>
                  <div class="mt-20 w-44 h-2 bg-slate-200 rounded"></div>
                </div>
                <div
                  class="w-max space-y-4 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 relative mt-2 rounded-md shadow-sm"
                >
                  <div class="flex justify-between items-end mt-10">
                    <div class="w-60 h-3 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="flex justify-between items-start">
                  <a
                    v-if="
                      firstCommit?.author && firstCommit?.author?.avatar_url
                    "
                    target="_blank"
                    :href="firstCommit.author.html_url"
                  >
                    <img
                      :src="firstCommit.author.avatar_url"
                      alt="picture"
                      class="w-20 rounded-lg"
                    />
                  </a>
                  <a v-else target="_blank">
                    <img
                      src="../assets/user/unavailable-pic.png"
                      alt="picture"
                      class="w-20 rounded-lg"
                    />
                  </a>
                  <div class="pl-5">
                    <label
                      for="firstCommit"
                      class="block text-base font-medium leading-6 text-gray-900 dark:text-green-200"
                      >{{
                        firstCommit
                          ? firstCommit.commit.author.name
                          : 'Loading...'
                      }}
                    </label>
                    <p class="text-gray-700 text-base dark:text-green-50">
                      {{
                        firstCommit?.author?.login
                          ? `@${firstCommit.author.login}`
                          : '@ unavailable'
                      }}
                    </p>
                  </div>
                  <div class="pt-20">
                    <p class="text-black text-xs font-bold dark:text-white">
                      {{ formatTimestamp(firstCommit.commit.author.date) }}
                    </p>
                  </div>
                </div>
                <div
                  class="w-max space-y-4 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 relative mt-2 rounded-md shadow-sm"
                >
                  <div class="flex justify-between items-end mt-10">
                    <p class="pr-4">🔖</p>
                    <p
                      class="text-gray-700 text-base font-style: italic dark:text-white"
                    >
                      <a target="_blank" :href="firstCommit.html_url">{{
                        firstCommit
                          ? `${firstCommit.commit.message.slice(0, 50)}${firstCommit.commit.message.length > 50 ? '...' : ''}`
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
    </div>
  </Transition>
</template>
