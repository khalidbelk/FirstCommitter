import {
  getRepositorySha,
  getCommitsNumber,
  getDefaultBranch,
  getFirstCommitFromPage
} from './githubApi'
import { parseUrl } from './utils'

export const getFirstCommit = async (url: string) => {
  const { author, repo } = parseUrl(url)
  const branch = await getDefaultBranch(author, repo)
  const commitsNumber = await getCommitsNumber(author, repo, branch)
  const repositorySha = await getRepositorySha(author, repo, branch)
  const oldestPageUrl = `https://github.com/${author}/${repo}/commits/${branch}?after=${repositorySha}+${commitsNumber - 34}`
  console.log('Oldest Page Url: ', oldestPageUrl)
  const firstCommit = await getFirstCommitFromPage(
    author,
    repo,
    branch,
    commitsNumber
  )
  console.log('First Commit: ', firstCommit)

  return firstCommit
  // console.log("Branch is: ", branch)
  //console.log("Author is: ", author)
  // console.log("Repo is: ", repo)
  //   console.log("Commits Number: ", commitsNumber)
  //  console.log("Repo SHA: ", repositorySha)
}
