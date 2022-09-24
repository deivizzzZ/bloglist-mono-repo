import { useState } from 'react'

export default function LoginForm({ loginApp }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const loginData = { username, password }
    loginApp(loginData)

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button id="login-form-button">login</button>
      </form>
    </>
  )
}
