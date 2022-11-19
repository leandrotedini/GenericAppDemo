import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { NAVIGATION_LINKS } from '../utils/navigation_helper'
import NavMenu from './Menu/NavMenu'
import PostForm from './Posts/PostForm'
import {
  Stack, Box, Flex, Spacer, Link, Text, HStack, Button, useDisclosure
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'


const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <>
      <Stack>
        <Flex minWidth='max-content'
          alignItems='center'
          gap='2'
          bg='green.500'
          color='white'
          px={8}
        >
          {NAVIGATION_LINKS.map( item =>
            <Box key={item.name} p='2'>
              <Link as={ReactRouterLink} to={item.url}>
                <Text fontSize='2xl'>
                  {item.name}
                </Text>
              </Link>
            </Box>
          )}
          <Spacer />
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              size='md'
              mx={2}
              bg='green.500'
              _hover={{ bg: 'green.400' }}
              color='white'
              variant='outline'
              onClick={onOpen}>
                Post
            </Button>
            <PostForm isOpen={isOpen} onClose={onClose} />
            <NavMenu/>
          </HStack>
        </Flex>
      </Stack>
    </>
  )
}

export default NavBar