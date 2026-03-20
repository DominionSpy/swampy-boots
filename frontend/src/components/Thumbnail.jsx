import thumbnail from './thumbnail.module.css'
import { Link } from 'react-router-dom'

const Thumbnail = ({ width, height, title, href = '/', children }) => {
  const variableStyle = {
    '--thumbnail-width': width + 'px',
    '--thumbnail-height': height + 'px',
  }

  return (
    <Link to={href} className={thumbnail.container}
      style={variableStyle}>
      <div className={thumbnail.header}>
        {title}
      </div>
      <div className={thumbnail.placeholder}>
        {children}
      </div>
    </Link>
  )
}

export default Thumbnail
