import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setALike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = blog => {
    dispatch(setALike(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible ? (
        <>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes}
            <button onClick={() => like(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username ===
          JSON.parse(window.localStorage.getItem('loggedUser')).username ? (
            <div className="remove">
              <button onClick={handleDelete}>remove</button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default Blog
