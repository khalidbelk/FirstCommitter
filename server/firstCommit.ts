import {
  //getRepositorySha,
  getCommitsNumber,
  getDefaultBranch,
  getFirstCommitFromPage
} from './githubApi'
import { parseInput } from './utils'

export const getFirstCommit = async (repository: string) => {
  const { owner, repo } = parseInput(repository)
  const { branch } = await getDefaultBranch(owner, repo)
  const commitsNumber = await getCommitsNumber(owner, repo, branch)
  //const repositorySha = await getRepositorySha(author, repo, branch)
  //const oldestPageUrl = `https://github.com/${author}/${repo}/commits/${branch}?after=${repositorySha}+${commitsNumber - 34}`
  //console.log('Oldest Page Url: ', oldestPageUrl)
  const { firstCommit, status } = await getFirstCommitFromPage(
    owner,
    repo,
    branch,
    commitsNumber
  )
  console.log('First Commit: ', firstCommit)

  return { firstCommit, status }
}
