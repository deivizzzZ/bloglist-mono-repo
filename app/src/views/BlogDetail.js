import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setALike, removeBlog, setAComment } from '../reducers/blogReducer'
import { Form, Button, ListGroup, Spinner } from 'react-bootstrap'

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [newComment, setNewComment] = useState('')

  const like = blog => {
    dispatch(setALike(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(setAComment(blog, newComment))
    setNewComment('')
  }

  if (!blog) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className="url">{blog.url}</div>
      <div className="likes">
        {blog.likes} likes
        <Button variant="primary" size="sm" onClick={() => like(blog)}>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username ===
      JSON.parse(window.localStorage.getItem('loggedUser')).username ? (
        <div className="remove">
          <Button variant="danger" size="sm" onClick={handleDelete}>
            remove
          </Button>
        </div>
      ) : null}
      <h3>comments</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            className="w-25"
            type="text"
            name="new-comment"
            value={newComment}
            onChange={event => setNewComment(event.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          add comment
        </Button>
      </Form>
      <ListGroup variant="flush">
        {blog.comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default BlogDetail
