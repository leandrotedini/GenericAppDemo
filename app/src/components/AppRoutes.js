import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserLogged } from '../features/users/userLoggedSlice'
import PostList from './Posts/PostList'
import UserList from './Users/UserList'
import User from './Users/User'
import Login from './Login'
import RegisterForm from './RegisterForm'
import PostDetails from './Posts/PostDetails'

const AppRoutes = () => {
  const user = useSelector(selectUserLogged)
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) navigate('/login')
  }, [user])

  return (
    <Routes>
      <Route path="/" element={<PostList/>} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<RegisterForm/>} />
      <Route path='posts/:id' element={<PostDetails />} />
      <Route path='users' element={<UserList/>} />
      <Route path='users/:id' element={<User />} />
    </Routes>
  )
}

export default AppRoutes