import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [createdBlog, setCreatedBlog] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUserJSON) {
      setUser(loggedUserJSON)
      blogService.setToken(loggedUserJSON.token)
    }
  }, [])

  const loginApp = async (loginData) => {
    try {
      const loggedUser = await loginService.login({
        username: loginData.username,
        password: loginData.password
      })

      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    } catch(e) {
      setErrorMessage(true)
      setTimeout(() => setErrorMessage(false), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  const createBlog = async (blogData) => {
    try {
      const newBlog = await blogService.create({
        title: blogData.title,
        author: blogData.author,
        url: blogData.url
      })

      setCreatedBlog(newBlog)
      setBlogs(prev => prev.concat(newBlog))

      setNotification(true)
      setTimeout(() => {
        setNotification(false)
        setCreatedBlog(null)
      }, 5000)
    } catch (err) {
      console.error(err)
    }
  }

  const addLike = async (id, blogData) => {
    try {
      const updatedBlog = await blogService.update(id, blogData)

      const tempBlogs = [...blogs]
      const index = tempBlogs.findIndex(blog => blog.id === updatedBlog.id)
      tempBlogs[index] = updatedBlog

      setBlogs(tempBlogs.sort((a, b) => b.likes - a.likes))
    } catch (err) {
      console.error(err)
    }
  }

  const removeBlog = id => {
    try {
      blogService.remove(id)

      setBlogs(prev => prev.filter(blog => blog.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (user === null) {
    return (
      <>
        <LoginForm loginApp={loginApp} />
        {errorMessage ? <Error /> : null}
      </>

    )
  }

  return (
    <>
      <h2>blogs</h2>
      {notification ? <Notification blog={createdBlog} /> : null}
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm createBlog={createBlog} />
      {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />)}
    </>
  )
}

export default App
