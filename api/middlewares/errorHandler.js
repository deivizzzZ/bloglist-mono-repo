const ERROR_HANDLERS = {
  CastError: res => res.status(400).end(),

  JsonWebTokenError: res =>
    res.status(401).json({ error: 'token missing or invalid' }),

  DefaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.DefaultError

  handler(response, error)
}
