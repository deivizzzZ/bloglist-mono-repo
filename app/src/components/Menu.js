import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to="/">
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            users
          </Nav.Link>
        </Nav>
        {user.name} logged in
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
