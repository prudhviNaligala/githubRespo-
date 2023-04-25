import './index.css'

const RepositoryItem = props => {
  const {gitData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = gitData
  return (
    <li className="li">
      <div className="items">
        <img className="logo" src={avatarUrl} alt={name} />
        <h1 className="logo-name">{name}</h1>
        <div className="details-container">
          <img
            className="images"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount}</p>
        </div>
        <div className="details-container">
          <img
            className="images"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p>{forksCount}</p>
        </div>
        <div className="details-container">
          <img
            className="images"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p>{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
