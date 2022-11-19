import { configureStore } from '@reduxjs/toolkit'
import userLoggedReducer from './features/users/userLoggedSlice'
import postsReducer from './features/posts/postsSlice'
import usersReducer from './features/users/usersSlice'
import notificationReducer from './features/notification/notificationSlice'

export default configureStore({
  reducer: {
    userLogged: userLoggedReducer,
    posts: postsReducer,
    users: usersReducer,
    notification: notificationReducer
  }
})