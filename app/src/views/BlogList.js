import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import Table from 'react-bootstrap/Table'

const BlogList = ({ blogs }) => (
  <>
    <BlogForm />
    <Table striped hover>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <Blog blog={blog} />
          </tr>
        ))}
      </tbody>
    </Table>
  </>
)

export default BlogList
