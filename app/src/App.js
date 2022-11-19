import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserLogged } from './features/users/userLoggedSlice'
import { BrowserRouter as Router } from 'react-router-dom'
import Notification from './components/Notification'
import AppRoutes from './components/AppRoutes'
import { Center } from '@chakra-ui/react'
import NavBar from './components/NavBar'

const App = () => {
  const user = useSelector(selectUserLogged)


  return (
    <Router>
      <Notification />
      { user && <NavBar /> }
      <Center>
        <AppRoutes />
      </Center>
    </Router>
  )
}

export default App
