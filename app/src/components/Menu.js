import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const menuStyle = {
    background: '#D3D3D3',
    padding: 5
  }
  const linkStyle = {
    paddingRight: 5
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div style={menuStyle}>
      <Link to="/" style={linkStyle}>
        blogs
      </Link>
      <Link to="/users" style={linkStyle}>
        users
      </Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
