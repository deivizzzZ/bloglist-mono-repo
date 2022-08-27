const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { username, password, name } = body

    if (username.length < 3 || password.length < 3) {
      response.status(400).json({
        error: '`username` and `password` must be at least 3 characters long'
      })
    } else {
      const passwordHash = await bcrypt.hash(password, 10)

      const user = new User({
        username,
        password: passwordHash,
        name
      })

      const savedUser = await user.save()
      response.status(201).json(savedUser)
    }
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = usersRouter