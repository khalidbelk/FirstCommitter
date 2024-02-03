export const parseUrl = (url: string) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)$/)
  if (match) {
    const [_, author, repo] = match
    return { author, repo }
  } else {
    throw new Error('Invalid GitHub URL format')
  }
}
