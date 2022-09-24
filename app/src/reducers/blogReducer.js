import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    likeBlog(state, action) {
      const changedBlog = action.payload
      return state
        .map(blog => {
          return blog.id === changedBlog.id ? changedBlog : blog
        })
        .sort((a, b) => b.likes - a.likes)
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, likeBlog, createBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const setALike = blog => {
  const update = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const changedBlog = await blogService.update(blog.id, update)
    dispatch(likeBlog(changedBlog))
  }
}

export const createNewBlog = data => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch(createBlog(newBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
