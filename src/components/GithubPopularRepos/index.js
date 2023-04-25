import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    githubList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstant.isLoading})
    const {activeLanguageId} = this.setState
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const updatedRepos = popularRepos.map(eachRepos => ({
        name: eachRepos.name,
        id: eachRepos.id,
        issuesCount: eachRepos.issues_count,
        forksCount: eachRepos.forks_count,
        starsCount: eachRepos.stars_count,
        avatarUrl: eachRepos.avatar_url,
      }))
      this.setState({
        githubList: updatedRepos,
        apiStatus: apiStatusConstant.success,
      })
    }
    if (response.status === 502) {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </>
  )

  updateActiveLanguage = id => {
    this.setState({activeLanguageId: id}, this.getRepos)
  }

  renderSuccess = () => {
    const {githubList, activeLanguageId} = this.state
    return (
      <div className="app-container">
        <h1>Popular</h1>
        <ul className="un-order">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              data={eachData}
              key={eachData.id}
              updateActiveLanguage={this.updateActiveLanguage}
              activeLanguageId={activeLanguageId}
            />
          ))}
        </ul>
        <ul className="repositoryIte-list">
          {githubList.map(eachList => (
            <RepositoryItem key={eachList.id} gitData={eachList} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccess()
      case apiStatusConstant.failure:
        return this.renderFailure()
      case apiStatusConstant.isLoading:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
