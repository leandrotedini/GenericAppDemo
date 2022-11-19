import React from 'react'
import CommentForm from './CommentForm'
import {
  List,
  ListItem,
  Avatar,
  Text,
  VStack,
  HStack,
  Stack
} from '@chakra-ui/react'

const CommentList = ({ comments = [] }) => {

  return (
    <Stack justify='start'>
      <List spacing={4}>
        {comments.map( comment =>
          <ListItem key={comment.id}>
            <HStack>
              <VStack>
                <Avatar
                  src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                  alt={'Author'}
                  size='sm'
                />
              </VStack>
              <HStack
                bg='gray.600'
                w='100%'
                px={4}
                py={2}
                borderRadius={16}
                color='white'>
                <Text>
                  {comment.text}
                </Text>
              </HStack>
            </HStack>
          </ListItem>
        )}
      </List>
      <Stack pt={2}>
        <CommentForm />
      </Stack>
    </Stack>
  )
}

export default CommentList