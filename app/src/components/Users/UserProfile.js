import React from 'react'

import {
  Button,
  Collapse,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import UserProfileForm from './UserProfileForm'


const UserProfile = () => {
  const { isOpen, onToggle } = useDisclosure()


  return (
    <VStack>
      { !isOpen && <Button onClick={onToggle}>Edit</Button> }
      <Collapse in={isOpen} animateOpacity>
        <UserProfileForm closeForm={onToggle}/>
      </Collapse>
    </VStack>
  )
}


export default UserProfile