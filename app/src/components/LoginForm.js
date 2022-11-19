import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectUserLogged } from '../features/users/userLoggedSlice'
import { setNotification } from '../features/notification/notificationSlice'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react'


const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const user = useSelector(selectUserLogged)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(
        loginUser({
          username: username.value,
          password: password.value
        })
      )
      resetUsername()
      resetPassword()
    } catch (exception) {
      dispatch(setNotification({
        description: exception.response.data.error,
        status: 'error'
      }))
    }
  }

  return (
    <form data-test-id='login-form' onSubmit={handleLogin}>
      <Stack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input { ...username } />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input { ...password } />
        </FormControl>
        <Stack spacing={10}>
          <Button
            type='submit'
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Sign in
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default LoginForm