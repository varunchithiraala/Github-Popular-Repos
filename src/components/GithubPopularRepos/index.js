import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularReposData: [],
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const reposData = await fetch(apiUrl)
    if (reposData.ok) {
      const reposResponse = await reposData.json()
      const updatedReposResponse = reposResponse.popular_repos.map(
        eachRepoResponse => ({
          name: eachRepoResponse.name,
          id: eachRepoResponse.id,
          issuesCount: eachRepoResponse.issues_count,
          forksCount: eachRepoResponse.forks_count,
          starsCount: eachRepoResponse.stars_count,
          avatarUrl: eachRepoResponse.avatar_url,
        }),
      )
      this.setState({
        popularReposData: updatedReposResponse,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderReposLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderReposSuccessView = () => {
    const {popularReposData} = this.state
    return (
      <ul className="popular-repos-data-list">
        {popularReposData.map(eachPoularReposData => (
          <RepositoryItem
            key={eachPoularReposData.id}
            repositoryItemDetails={eachPoularReposData}
          />
        ))}
      </ul>
    )
  }

  renderReposFailureView = () => (
    <div className="popular-repos-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="popular-repos-failure-image"
        alt="failure view"
      />
      <h1 className="popular-repos-failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryItemsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderReposLoadingView()
      case apiStatusConstants.success:
        return this.renderReposSuccessView()
      case apiStatusConstants.failure:
        return this.renderReposFailureView()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = updatedFilterId => {
    this.setState(
      {activeLanguageFilterId: updatedFilterId},
      this.getPopularRepos,
    )
  }

  renderLanguageFilterItemsList = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <ul className="popular-repos-languages-list">
        {languageFiltersData.map(eachLanguageFilterData => (
          <LanguageFilterItem
            key={eachLanguageFilterData.id}
            languageFilterDetails={eachLanguageFilterData}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
            isActive={eachLanguageFilterData.id === activeLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="popular-repos-app-container">
        <div className="popular-repos-container">
          <h1 className="popular-repos-heading">Popular</h1>
          {this.renderLanguageFilterItemsList()}
          {this.renderRepositoryItemsList()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
