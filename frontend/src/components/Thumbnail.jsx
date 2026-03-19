import { Link } from 'react-router-dom'

const Thumbnail = ({ width, height, title, href = '/', children }) => {
  const containerStyle = {
    float: 'left',
    margin: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5f5f5f',
    borderRadius: 10,
    backgroundColor: '#1f1f1f'
  }

  const headerStyle = {
    width: width + 'px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#3f3f3f',
    color: 'white'
  }

  const placeholderStyle = {
    width: width + 'px',
    height: height + 'px',
    padding: 10
  }

  return (
    <Link to={href} style={containerStyle}>
      <div style={headerStyle}>
        {title}
      </div>
      <div style={placeholderStyle}>
        {children}
      </div>
    </Link>
  )
}

export default Thumbnail
