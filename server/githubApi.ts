import axios from 'axios'

export const getRepositorySha = async (
  author: string,
  repo: string,
  branch: string
) => {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${author}/${repo}/commits/${branch}`,
      {
        method: 'get'
      }
    )
    return res.data.sha
  } catch (error) {
    return error
  }
}

export const getCommitsNumber = async (
  author: string,
  repo: string,
  branch: string
) => {
  try {
    const response = await axios.head(
      `https://api.github.com/repos/${author}/${repo}/commits`,
      {
        params: { sha: branch, per_page: 1, page: 1 }
      }
    )

    const linkHeader = response.headers.link
    const lastLink = linkHeader?.match(/<[^>]+>; rel="last"/)

    if (lastLink) {
      const totalPages = parseInt(lastLink[0].match(/&page=(\d+)/)![1], 10)
      return totalPages
    } else {
      // If "last" link not found, default to 1 page
      return 1
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getDefaultBranch = async (author: string, repo: string) => {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${author}/${repo}`,
      {
        method: 'get'
      }
    )
    return res.data.default_branch
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getFirstCommitFromPage = async (
  author: string,
  repo: string,
  branch: string,
  position: number
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${author}/${repo}/commits`,
      {
        params: {
          sha: branch,
          per_page: 1,
          page: position
        }
      }
    )
    const firstCommit = response.data[0]
    return firstCommit
  } catch (error) {
    // Handle errors
    throw error
  }
}

/* This is for later, a possible feat where the user would be able to select the branch, for now it's default only

export const getBranches = async (author: string, repo: string) => {
    try {
        const res =  await axios.get(`https://api.github.com/repos/${author}/${repo}/branches`, {
        method: 'get'
    })
        const branches = res.data.map((branch: any) => branch.name);
        return branches
    } catch(error) {
        return error;
    }
} */
