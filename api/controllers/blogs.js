const bcrypt = require('bcrypt')
const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const userExtractor = require('../middlewares/userExtractor')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const newBlog = request.body

  try {
    if (newBlog.title && newBlog.url) {
      const { id } = request
      const user = await User.findById(id)
  
      const blogToSave = new Blog({
        ...newBlog,
        likes: newBlog.likes || 0,
        user: user._id
      })
    
      const savedBlog = await (await blogToSave.save()).populate('user', {
        username: 1,
        name: 1
      })
  
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
  
      response.status(201).json(savedBlog)
  
    } else {
      response.status(400).end()
    }
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id: userId } = request
  const { id: blogId } = request.params
  try {
    const blog = await Blog.findById(blogId)

    if (blog.user.toString() !== userId.toString()) {
      return response.status(401).json({ error: 'you are not the blog\'s creator' })
    }

    const user = await User.findById(userId)
    const deletedBlog = await Blog.findByIdAndDelete(blogId)

    user.blogs = user.blogs.filter(blog => blog.toString() !== deletedBlog._id.toString())
    await user.save()

    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const blog = request.body

  const newBlogInfo = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogInfo, { new: true }).populate('user', {
      username: 1,
      name: 1
    })
    response.json(updatedBlog)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter