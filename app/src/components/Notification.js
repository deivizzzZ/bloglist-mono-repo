import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)
  const mode = useSelector(state => state.notification.mode)

  const variant =
    mode === 'info' ? 'success' : mode === 'error' ? 'danger' : null

  const className = mode === 'error' ? 'w-25' : null

  return (
    <Alert variant={variant} className={className}>
      {notification}
    </Alert>
  )
}

export default Notification
