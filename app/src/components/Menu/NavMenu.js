import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/users/userLoggedSlice'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  LinkBox,
  Avatar
} from '@chakra-ui/react'

const NavMenu = () => {
  const dispatch = useDispatch()

  return (
    <Menu>
      <MenuButton>
        <Avatar src='https://bit.ly/dan-abramov'/>
      </MenuButton>
      <MenuList bg='green.600'>
        <NavMenuItem>
          <LinkBox
            as={ReactRouterLink}
            to='/'
            onClick={() => dispatch(logout())}
          >
            Logout
          </LinkBox>
        </NavMenuItem>
      </MenuList>
    </Menu>
  )
}

const NavMenuItem = ({ children }) => {
  const background = 'green.400'

  return (
    <MenuItem
      _hover={{ background }}
      _active={{ background }}
      _focus={{ background }}
    >
      {children}
    </MenuItem>
  )
}

export default NavMenu