import type { Ref } from 'vue'

export function useToast(
  status: Ref<number>,
  showToastStatus: Ref<boolean>,
  toastStatus: any
) {
  const showToast = () => {
    showToastStatus.value = true

    if (status.value === 200) {
      toastStatus.value = 'success'
    } else {
      toastStatus.value = 'error'
    }

    setTimeout(() => {
      showToastStatus.value = false
    }, 3000)
  }
  return { showToast }
}
