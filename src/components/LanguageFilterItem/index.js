import './index.css'

const LanguageFilterItem = props => {
  const {data, activeLanguageId} = props
  console.log(activeLanguageId)
  const {id, language} = data

  const onclickUpdateLanguage = () => {
    const {updateActiveLanguage} = props
    updateActiveLanguage(id)
  }

  return (
    <li className="lists">
      <div className="btn-container">
        <button type="button" className="btn" onClick={onclickUpdateLanguage}>
          {language}
        </button>
      </div>
    </li>
  )
}

export default LanguageFilterItem
