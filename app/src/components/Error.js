const Error = () => {
  const mystyle = {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: 'lightgray',
    color: 'red',
    border: '3px solid red',
    borderRadius: '5px'
  }
  return (
    <div style={mystyle} className='error'>
      wrong username or password
    </div>
  )
}

export default Error