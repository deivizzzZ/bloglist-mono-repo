const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })
  return sum
}

const favoriteBlog = blogs => {
  let favorite = { likes: 0 }
  if (blogs.length === 0) return { error: 'no blogs found' }
  blogs.forEach(blog => {
    if (blog.likes >= favorite.likes) {
      favorite = { ...blog }
    }
  })
  return favorite
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return { error: 'no blogs found' }
  const authors = blogs.map(blog => blog.author)
  const blogsPerAuthor = _.countBy(authors)
  const maxBlogs = Math.max(...Object.values(blogsPerAuthor))
  const maxAuthor = Object.keys(blogsPerAuthor).find(
    author => blogsPerAuthor[author] === maxBlogs
  )
  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = blogs => {
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author')
  const likesPerAuthor = []
  for (const author in blogsGroupedByAuthor) {
    const likes = totalLikes(blogsGroupedByAuthor[author])
    likesPerAuthor.push({
      author: author,
      likes: likes
    })
  }
  const maxLikes = favoriteBlog(likesPerAuthor)
  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
