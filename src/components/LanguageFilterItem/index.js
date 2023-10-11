// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterDetails, setActiveLanguageFilterId, isActive} = props
  const {id, language} = languageFilterDetails
  const languageButtonClassName = isActive
    ? 'language-button active-button'
    : 'language-button'

  const OnClickLanguageButton = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li className="language-item">
      <button
        type="button"
        className={languageButtonClassName}
        onClick={OnClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
