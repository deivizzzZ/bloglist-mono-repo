import { useState, useRef } from 'react'
import Togglable from './Togglable'

export default function BlogForm({ createBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    const blogData = { title, author, url }
    createBlog(blogData)

    setTitle('')
    setAuthor('')
    setUrl('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='create new blog' ref={togglableRef}>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div className='title'>
          <label>title:</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div className='author'>
          <label>author:</label>
          <input
            type='text'
            name='author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div className='url'>
          <label>url:</label>
          <input
            type='text'
            name='url'
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button id='blog-form-button'>create</button>
      </form>
    </Togglable>
  )
}