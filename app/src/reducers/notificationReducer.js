import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: null,
    mode: null,
    timeoutID: null
  },
  reducers: {
    createSetTimeout(state, action) {
      return {
        notification: state.notification,
        mode: state.mode,
        timeoutID: action.payload
      }
    },
    setNotification(state, action) {
      const { message, mode } = action.payload
      if (state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return {
        notification: message,
        mode,
        timeoutID: null
      }
    },
    // eslint-disable-next-line no-unused-vars
    clearNotification(state, action) {
      return {
        notification: null,
        mode: null,
        timeoutID: null
      }
    }
  }
})

export const { createSetTimeout, setNotification, clearNotification } =
  notificationSlice.actions

export const showNotification = (message, mode, time) => {
  return async dispatch => {
    dispatch(setNotification({ message, mode }))
    const timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
    dispatch(createSetTimeout(timeoutID))
  }
}

export default notificationSlice.reducer
