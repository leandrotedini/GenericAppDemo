import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserById } from '../../features/users/usersSlice'
import { selectPostByUserId } from '../../features/posts/postsSlice'
import { PostContent, PostLikes, PostCard } from '../Posts/Post'
import {
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'



const User = () => {
  const id = useParams().id
  const user = useSelector(state => selectUserById(state, id))
  const posts = useSelector(state => selectPostByUserId(state, user.id))

  console.log(posts)

  return(
    <Stack>
      <Heading
        color={useColorModeValue('gray.700', 'white')}
        fontSize={'2xl'}
        fontFamily={'body'}>
        {user.username}
      </Heading>

      {posts.map(post =>
        <PostCard key={post.id}>
          <LinkBox>
            <LinkOverlay as={ReactRouterLink} to={`/posts/${post.id}`}>
              <PostContent content={post.content}/>
            </LinkOverlay>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
              <Text color={'gray.500'}>{post.createdAt}</Text>
              <Spacer />
              <PostLikes post={post} />
            </Stack>
          </LinkBox>
        </PostCard>
      )}
    </Stack>


  )
}

export default User