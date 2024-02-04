export const parseUrl = (url: string) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)$/)
  if (match) {
    const [_, author, repo] = match
    return { author, repo }
  } else {
    throw new Error('Invalid GitHub URL format')
  }
}

export const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    const formatDateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', formatDateOptions);

    const formatTimeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    const formattedTime = date.toLocaleTimeString('en-US', formatTimeOptions);
    return `${formattedDate} at ${formattedTime}`;
};
