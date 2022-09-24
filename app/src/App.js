import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser, logoutUser } from './reducers/userReducer'

function App() {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

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
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default App
