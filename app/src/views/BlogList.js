import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'

const BlogList = ({ blogs }) => (
  <>
    <BlogForm />
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </>
)

export default BlogList
