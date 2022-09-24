import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)
  const mode = useSelector(state => state.notification.mode)

  const infoStyle = {
    padding: '10px',
    backgroundColor: 'lightgray',
    color: 'green',
    border: '3px solid green',
    borderRadius: '5px'
  }

  const errorStyle = {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: 'lightgray',
    color: 'red',
    border: '3px solid red',
    borderRadius: '5px'
  }

  const myStyle =
    mode === 'info' ? infoStyle : mode === 'error' ? errorStyle : null

  return notification ? <div style={myStyle}>{notification}</div> : null
}

export default Notification
