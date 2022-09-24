import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const newBlogInfo = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    addLike(blog.id, newBlogInfo)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
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
            <button onClick={handleLike}>like</button>
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
