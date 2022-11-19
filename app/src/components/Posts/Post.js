import React from 'react'
import { useDispatch } from 'react-redux'
import { likePosts } from '../../features/posts/postsSlice'
import{ LikeHeartSocialShape, LikeHeartSocial } from '../../utils/custom_icons'
import {
  Heading,
  Text,
  Stack,
  Flex,
  Avatar,
  IconButton,
  useColorModeValue,
  Spacer,
  Box
} from '@chakra-ui/react'


const Post = ({ post }) => {
  return (
    <>
      <PostContent content={post.content}/>
      <PostBody post={post}/>
    </>
  )
}

export const PostContent = ({ content }) => {
  return(
    <Heading
      color={useColorModeValue('gray.700', 'white')}
      fontSize={'2xl'}
      fontFamily={'body'}>
      {content}
    </Heading>
  )
}

export const PostBody = ({ post }) => {

  return(
    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
      <Avatar
        src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
        alt={'Author'}
      />
      <Stack direction={'column'} spacing={0} fontSize={'sm'}>
        <Text fontWeight={600}>{post.user.username}</Text>
        <Text color={'gray.500'}>{post.createdAt}</Text>
      </Stack>
      <Spacer />
      <Flex align='end'>
        <PostLikes post={post} />
      </Flex>
    </Stack>
  )
}

export const PostLikes = ({ post }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Text px={2}>{`${post.likes} likes`}</Text>
      <IconButton
        icon={post.likedByUser
          ? <LikeHeartSocial />
          : <LikeHeartSocialShape />}
        onClick={() => dispatch(likePosts(post.id))}
      />
    </>
  )
}

export const PostCard = ({ children }) => {
  const bgColor = useColorModeValue('white', 'gray.900')

  return (
    <Box
      w='full'
      bg={bgColor}
      boxShadow='2xl'
      rounded='md'
      p={6}
      overflow='hidden'>
      {children}
    </Box>
  )
}

export default Post