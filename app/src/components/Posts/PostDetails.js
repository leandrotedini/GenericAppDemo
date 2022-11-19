import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLogged } from '../../features/users/userLoggedSlice'
import { useParams } from 'react-router-dom'
import { deletePosts, fetchPostsComments, selectPostById } from '../../features/posts/postsSlice'
import Post, { PostCard } from './Post'
import CommentList from '../Comments/CommentList'
import {
  Box,
  Center,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  Divider,
} from '@chakra-ui/react'
import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons'



const PostDetails = () => {

  const dispatch = useDispatch()
  const id = useParams().id
  const post = useSelector(state => selectPostById(state, id))
  const user = useSelector(selectUserLogged)

  useEffect(() => {
    dispatch(fetchPostsComments(id))
  }, [])

  const deletePost = () => {
    if (window.confirm(`Remove ${post.title}`)) {
      dispatch(deletePosts(id))
    }
  }

  return (
    <Center>
      <VStack>
        <PostCard key={post.id}>
          <Post post={post}/>
          <HStack
            align={'end'}
            verticalAlign
            justify={'space-between'}
            pt={8}>
            <Text color={'gray.500'}>
              More info: <Link href="#" isExternal>
                {post.url} <ExternalLinkIcon mx='2px' />
              </Link>
            </Text>
            { post.user.username === user.username
              && <IconButton
                size='sm'
                bg='red.500'
                _hover={{ bg: 'red.400' }}
                color='white'
                icon={<DeleteIcon />}
                onClick={deletePost} /> }
          </HStack>
          <Divider my={6} color={'gray.900'}/>
          <Box >
            <CommentList comments={post.comments}/>
          </Box>
        </PostCard>
      </VStack>
    </Center>
  )
}

export default PostDetails