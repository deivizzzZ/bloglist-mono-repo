const Notification = ({ blog }) => {
  const mystyle = {
    padding: '10px',
    backgroundColor: 'lightgray',
    color: 'green',
    border: '3px solid green',
    borderRadius: '5px'
  }
  return (
    <div style={mystyle}>
      a new blog {blog.title} by {blog.author} added
    </div>
  )
}

export default Notification
