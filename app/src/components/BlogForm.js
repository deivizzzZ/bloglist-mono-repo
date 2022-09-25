import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { createNewBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function BlogForm() {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()

    const blogData = { title, author, url }
    dispatch(createNewBlog(blogData))
    dispatch(
      showNotification(`a new blog ${title} by ${author} added`, 'info', 5)
    )

    setTitle('')
    setAuthor('')
    setUrl('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="create new blog" ref={togglableRef}>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>title:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>author:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </Form.Group>
        <Button variant="info" type="submit" id="blog-form-button">
          create
        </Button>
      </Form>
    </Togglable>
  )
}
