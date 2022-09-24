import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clearUser(state, action) {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const initUser = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  if (loggedUser) {
    return async dispatch => {
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }
}

export const loginUser = data => {
  return async dispatch => {
    const loggedUser = await loginService.login(data)
    dispatch(setUser(loggedUser))
    blogService.setToken(loggedUser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(clearUser())
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }
}

export default userSlice.reducer
