import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import userSevice from '../services/users'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/users/userLoggedSlice'
import { setNotification } from '../features/notification/notificationSlice'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetLastName, ...lastName } = useField('text')
  const { reset: resetPassword, ...password } = useField(showPassword ? 'text' : 'password')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleRegister = async event => {
    event.preventDefault()

    try {
      await userSevice.create({
        username: username.value,
        name: name.value,
        lastName: lastName.value,
        password: password.value
      })

      dispatch(loginUser({
        username: username.value,
        password: password.value
      }))

      resetUsername()
      resetName()
      resetPassword()
      resetLastName()
      navigate('/')

    } catch (exception) {
      dispatch(setNotification({
        description: exception.response.data.error,
        status: 'error'
      }))
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <Stack spacing={4}>
        <HStack>
          <Box>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input { ...name } />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input { ...lastName } />
            </FormControl>
          </Box>
        </HStack>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input { ...username } />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input { ...password } />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() =>
                  setShowPassword((showPassword) => !showPassword)
                }>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={10} pt={2}>
          <Button
            type='submit'
            loadingText="Submitting"
            size="lg"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Sign up
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default RegisterForm