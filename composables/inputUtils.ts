import { REPOSITORY_REGEX } from '@/shared/utils/constants'

export function useInputValidation(
  repository: Ref<string>,
  validationError: Ref<boolean>,
  showRequired: Ref<boolean>,
  errorMessage: Ref<string>
) {
  const onInput = () => {
    showRequired.value = false
  }

  const validateInput = () => {
    if (!repository.value.trim()) {
      validationError.value = true
      showRequired.value = true
      errorMessage.value = 'This field is required.'
    } else {
      validationError.value = false
      errorMessage.value = ''
    }
  }

  const isValidRepository = () => !!repository.value.match(REPOSITORY_REGEX)

  return {
    onInput,
    validateInput,
    isValidRepository
  }
}
