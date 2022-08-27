const mongoose = require('mongoose')

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URL
  : process.env.MONGO_URL

mongoose.connect(mongoUrl)