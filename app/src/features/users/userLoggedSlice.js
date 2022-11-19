import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'
import {
  setUserLocalStorage,
  getUserLocalStorage,
  removeUserLocalStorage
} from '../../utils/login_helper'

const initialState = {
  userLogged: getUserLocalStorage(),
  status: 'idle',
  error: null
}

export const loginUser = createAsyncThunk('users/login',
  async user => await loginService.login(user))

const usersLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    logout: state => {
      removeUserLocalStorage()
      state.userLogged = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const user = action.payload
        setUserLocalStorage(user)
        state.userLogged = user
      })
  }
})

export const selectUserLogged = state => state.userLogged.userLogged
export const selectUserToken = state => state.userLogged.userLogged.token
export const { logout } = usersLoggedSlice.actions
export default usersLoggedSlice.reducer