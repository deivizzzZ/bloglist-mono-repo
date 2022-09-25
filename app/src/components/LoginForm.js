import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const loginData = { username, password }
    dispatch(loginUser(loginData)).catch(() =>
      dispatch(showNotification('wrong credentials', 'error', 5))
    )

    navigate('/')

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>username</Form.Label>
          <Form.Control
            className="w-25"
            type="text"
            name="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password</Form.Label>
          <Form.Control
            className="w-25"
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="dark" size="lg" type="submit" id="login-form-button">
          login
        </Button>
      </Form>
    </>
  )
}
