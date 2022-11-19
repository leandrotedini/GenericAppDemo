import React, { useEffect } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, selectAllPosts } from '../../features/posts/postsSlice'
import { PostContent, PostBody, PostCard } from './Post'
import {
  LinkOverlay,
  Heading,
  StackDivider,
  LinkBox,
  Stack,
  Container,
} from '@chakra-ui/react'

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <Container>
      <Heading as='h2' size='2xl' my={4}>
        Posts
      </Heading>
      <Stack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        direction={'column'}
      >
        {posts.map(post =>
          <PostCard key={post.id}>
            <LinkBox >
              <LinkOverlay as={ReactRouterLink} to={`/posts/${post.id}`}>
                <PostContent content={post.content}/>
              </LinkOverlay>
              <PostBody post={post} />
            </LinkBox>
          </PostCard>
        )}
      </Stack>
    </Container>
  )
}

export default PostsList