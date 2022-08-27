const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const auth = request.get('Authorization')
  let token = ''
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    token = auth.split(' ')[1]
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id } = decodedToken
  request.id = id

  next()
}