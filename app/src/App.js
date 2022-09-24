import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './views/BlogList'
import Users from './views/Users'
import UserDetail from './views/UserDetail'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser, logoutUser } from './reducers/userReducer'
import userService from './services/users'

function App() {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(list => setUsers(list))
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const userMatch = useMatch('/users/:id')
  const detailedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  if (user === null) {
    return (
      <>
        <LoginForm />
        <Notification />
      </>
    )
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetail user={detailedUser} />} />
      </Routes>
    </>
  )
}

export default App
