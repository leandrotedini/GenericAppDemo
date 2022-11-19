import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../../services/users'

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers',
  async () => await userService.getAll())

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
  }
})

export const selectUsers = state => state.users.users
export const selectUserById = (state, id) => state.users.users.find((user) => user.id === id)
export default usersSlice.reducer