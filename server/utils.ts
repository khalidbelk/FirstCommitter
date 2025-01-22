import { REPOSITORY_REGEX } from '@/shared/utils/constants'

export const parseInput = (input: string) => {
  const match = input.match(REPOSITORY_REGEX)

  if (match) {
    const [_, owner, repo] = match
    return { owner, repo }
  } else {
    throw new Error('Invalid GitHub repository format')
  }
}

export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)

  const formatDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = date.toLocaleDateString('en-US', formatDateOptions)

  const formatTimeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric'
  }
  const formattedTime = date.toLocaleTimeString('en-US', formatTimeOptions)
  return `${formattedDate} at ${formattedTime}`
}
