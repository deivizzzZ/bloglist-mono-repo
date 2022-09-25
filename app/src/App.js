import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import BlogList from './views/BlogList'
import Users from './views/Users'
import UserDetail from './views/UserDetail'
import BlogDetail from './views/BlogDetail'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
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

  const userMatch = useMatch('/users/:id')
  const detailedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const detailedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  if (user === null) {
    return (
      <div className="container">
        <LoginForm />
        <Notification />
      </div>
    )
  }

  return (
    <div className="container">
      <Menu user={user} />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetail user={detailedUser} />} />
        <Route path="/blogs/:id" element={<BlogDetail blog={detailedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
