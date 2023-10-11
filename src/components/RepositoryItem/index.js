// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl
  } = repositoryItemDetails

  return (
    <li className="repository-item-list">
      <img className="repository-item-image" src={avatarUrl} alt={name} />
      <h1 className="repository-item-heading">{name}</h1>
      <div className="repository-item-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="repository-item-card-image"
          alt="stars"
        />
        <p className="repository-item-text">{starsCount} stars</p>
      </div>
      <div className="repository-item-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="repository-item-card-image"
          alt="forks"
        />
        <p className="repository-item-text">{forksCount} forks</p>
      </div>
      <div className="repository-item-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="repository-item-card-image"
          alt="open issues"
        />
        <p className="repository-item-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
