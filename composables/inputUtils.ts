export function useInputValidation(
  repositoryUrl: Ref<string>,
  validationError: Ref<boolean>,
  showRequired: Ref<boolean>,
  errorMessage: Ref<string>
) {
  const onInput = () => {
    showRequired.value = false
  }

  const validateInput = () => {
    if (!repositoryUrl.value.trim()) {
      validationError.value = true
      showRequired.value = true
      errorMessage.value = 'This field is required.'
    } else {
      validationError.value = false
      errorMessage.value = ''
    }
  }

  const isValidUrl = (repositoryUrl: string) => {
    const prefixes = [
      'https://www.github.com/',
      'https://github.com/',
      'www.github.com/',
      'github.com/'
    ]
    return prefixes.some((prefix) => repositoryUrl.startsWith(prefix))
  }

  return {
    onInput,
    validateInput,
    isValidUrl
  }
}
