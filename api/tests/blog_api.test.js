const mongoose = require('mongoose')
const { server } = require('../index')
const Blog = require('../models/Blog')
const { api } = require('../utils/test_helper')

const initialBlogs = [
  {
    title: "Prueba Nº 1",
    author: "Waltraut Pritha",
    url: "http://example.com/1",
    likes: 5,
    user: "62ee6efcbaafe8fedab30d56"
  },
  {
    title: "Prueba Nº 2",
    author: "Yaroslav Eefje",
    url: "http://example.com/2",
    likes: 3,
    user: "62ee6efcbaafe8fedab30d56"
  },
  {
    title: "Prueba Nº 3",
    author: "Thisbe Maisie",
    url: "http://example.com/3",
    likes: 0,
    user: "62ee6efcbaafe8fedab30d56"
  }
]

let token = ''

beforeAll(async () => {
  const login = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'pswd'
    })
  token = 'Bearer ' + login.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('HTTP GET request', () => {

  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all initial blogs found', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('identifier property is named \'id\'', async () => {
    const response = await api.get('/api/blogs')
    const blogToGet = response.body[0]
    expect(blogToGet.id).toBeDefined()
  })
})

describe('HTTP POST request', () => {

  test('new blog successfully created', async () => {
    const newBlog = {
      title: "BEST BLOG IN THE UNIVERSE",
      author: "MYSELF",
      url: "http://example.com/best",
      likes: 1000000,
      user: "62ee6efcbaafe8fedab30d56"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const thisBlog = response.body.find(blog => blog.url === newBlog.url)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(thisBlog.url).toBe(newBlog.url)
  })

  test('if \'likes\' property is missing it will default to 0', async () => {
    const newBlog = {
      title: "A blog with no likes",
      author: "Milhouse",
      url: "http://example.com/no-likes",
      user: "62ee6efcbaafe8fedab30d56"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const thisBlog = response.body.find(blog => blog.url === newBlog.url)
    expect(thisBlog.likes).toBe(0)
  })

  test('if \'title\' or \'url\' properties are missing responds \'Bad Request\'', async () => {
    const blogWithoutTitle = {
      author: "Peepo",
      url: "http://example.com/no-title",
      likes: 1,
      user: "62ee6efcbaafe8fedab30d56"
    }
    const blogWithoutUrl = {
      title: "Oops, I forgot url...",
      author: "Pepe The Frog",
      likes: 1,
      user: "62ee6efcbaafe8fedab30d56"
    }
    const blogWithoutTitleAndUrl = {
      author: 'A very stupid guy',
      likes: 1,
      user: "62ee6efcbaafe8fedab30d56"
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .set('Authorization', token)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .set('Authorization', token)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(blogWithoutTitleAndUrl)
      .set('Authorization', token)
      .expect(400)
  })

  test('adding a blog fails if a token is not provided', async () => {
    const newBlog = {
      title: "Non-Authorized Blog",
      author: "Anonymous",
      url: "http://non-auth.org",
      user: "62ee6efcbaafe8fedab30d56"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('HTTP DELETE request', () => {

  test('deleting a single blog post with a valid id', async () => {
    const firstResponse = await api.get('/api/blogs')
    const noteToDelete = firstResponse.body[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const secondResponse = await api.get('/api/blogs')
    const deletedNote = secondResponse.body.find(blog => blog.url === noteToDelete.url)

    expect(secondResponse.body).toHaveLength(initialBlogs.length - 1)
    expect(deletedNote).toBeUndefined()
  })

  test('delete request with an invalid id is not processed', async () => {
    await api
      .delete('/api/blogs/1234')
      .set('Authorization', token)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('HTTP PUT request', () => {

  test('updating a single blog post with a valid id', async () => {
    const firstResponse = await api.get('/api/blogs')
    const noteToUpdate = firstResponse.body[0]

    const newBlog = {
      title: "Updated title",
      author: "Updated author",
      url: "http://example.com/updated",
      likes: 0
    }

    await api
      .put(`/api/blogs/${noteToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const secondResponse = await api.get('/api/blogs')
    const updatedBlog = secondResponse.body.find(blog => blog.url === newBlog.url)

    expect(secondResponse.body).toHaveLength(initialBlogs.length)
    expect(updatedBlog.url).toBe(newBlog.url)
  })

  test('update request with an invalid id is not processed', async () => {
    await api
      .put('/api/blogs/1234')
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})