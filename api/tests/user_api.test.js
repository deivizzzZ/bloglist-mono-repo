const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { server } = require('../index')
const User = require('../models/User')
const { api, getUsers } = require('../utils/test_helper')

beforeEach(async () => {
  await User.deleteMany({})

  const password = await bcrypt.hash('pswd', 10)
  const user = new User({
    username: 'root',
    password,
    name: 'Root User'
  })

  await user.save()
})

describe('creating a new user', () => {
  test('creation fails w/ proper statuscode & message if username is already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'root',
      password: 'test',
      name: 'Another Root User'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.errors.username.message).toContain('`username` to be unique')

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails w/ proper statuscode & message if username/password are not long enough', async () => {
    const usersAtStart = await getUsers()

    const userWithBadUsername = {
      username: 'a',
      password: 'validpass',
      name: 'User with Bad Username'
    }
    const userWithBadPassword = {
      username: 'validusername',
      password: '1',
      name: 'User with Bad Password'
    }

    const badUserResult = await api
      .post('/api/users')
      .send(userWithBadUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(badUserResult.body.error).toContain('at least 3 characters long')

    const badPassResult = await api
      .post('/api/users')
      .send(userWithBadPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(badPassResult.body.error).toContain('at least 3 characters long')

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})