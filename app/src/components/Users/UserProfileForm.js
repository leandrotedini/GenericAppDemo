import React from 'react'
import { useField } from '../../hooks'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Flex,
  Button
} from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'

const UserProfileForm = ({ closeForm }) => {
  const name = useField('text')
  const lastName = useField('text')
  const bio = useField('text')
  const bithday = useField('date')


  return (
    <form>
      <Flex
        direction={'column'}
        gap={2}>
        <HStack>
          <Box>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input { ...name } />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="firstName">
              <FormLabel>Last Name</FormLabel>
              <Input { ...lastName } />
            </FormControl>
          </Box>
        </HStack>
        <Box>
          <FormControl id="firstName">
            <FormLabel>Bio</FormLabel>
            <Input { ...bio } />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="firstName">
            <HStack>
              <CalendarIcon />
              <Input { ...bithday } />
            </HStack>
          </FormControl>
        </Box>
        <HStack >
          <Button
            type="submit"
            bg='blue.500'
            color={'white'}
            _hover={{
              bg: 'blue.600',
            }}>
            Save
          </Button>
          <Button
            bg='gray.500'
            color={'white'}
            _hover={{
              bg: 'gray.600',
            }}
            mr={3}
            onClick={closeForm}>
            Close
          </Button>
        </HStack>
      </Flex>
    </form>
  )
}


export default UserProfileForm