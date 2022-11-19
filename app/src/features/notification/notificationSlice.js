import { createSlice } from '@reduxjs/toolkit'

const emptyNotification = { description: '', status: '' }

const initialState = {
  notification: emptyNotification,
  status: 'idle',
  error: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    cleanNotification: (state) => {
      state.notification = emptyNotification
    }
  },
})

export const { setNotification, cleanNotification } = notificationSlice.actions
export const selectNotification = state => state.notification.notification
export default notificationSlice.reducer