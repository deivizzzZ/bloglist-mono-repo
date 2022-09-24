const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passCorrect)) {
    return response.status(401).json({ error: 'invalid user or password' })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
