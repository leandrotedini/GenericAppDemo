import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

const Login = () => {

  let bottomMessage, linkText
  const [ showRegisterForm, setShowRegisterForm ] = useState(false)

  if (showRegisterForm) {
    bottomMessage = 'Already a user?'
    linkText = 'Login'
  } else {
    bottomMessage = 'do you need an account?'
    linkText = 'Sing up'
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgGradient='linear(to-b, green.500, green.300)'
      w={'100vw'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack align={'center'} mb={8}>
            <Heading fontSize={'4xl'}>Blogs App</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              made it with ❤️ by Leandro Tedini
            </Text>
          </Stack>
          {showRegisterForm
            ? <RegisterForm />
            : <LoginForm />
          }
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justify={'center'}
            mt={8}>
            <Text fontSize={'md'} color={'gray.600'}>
              {bottomMessage}
            </Text>
            <Link
              to={'/signup'}
              color={'blue.400'}
              onClick={() => setShowRegisterForm(!showRegisterForm)} >
              {linkText}
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login