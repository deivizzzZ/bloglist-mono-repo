import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setALike, removeBlog } from '../reducers/blogReducer'

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const like = blog => {
    dispatch(setALike(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  if (!blog) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className="url">{blog.url}</div>
      <div className="likes">
        {blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username ===
      JSON.parse(window.localStorage.getItem('loggedUser')).username ? (
        <div className="remove">
          <button onClick={handleDelete}>remove</button>
        </div>
      ) : null}
    </>
  )
}

export default BlogDetail
