import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPostsComments } from '../../features/posts/postsSlice'
import { useField } from '../../hooks'
import {
  Input,
  HStack,
  Button
} from '@chakra-ui/react'

const CommentForm = () => {
  const postId = useParams().id
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('text')

  const handleCreateComments = (event) => {
    event.preventDefault()

    const newComment = {
      text: comment.value,
      post: postId
    }

    try {
      dispatch(createPostsComments(newComment))
      resetComment()
    } catch (exception) {
      console.log(exception)
    }
  }

  return <>
    <form onSubmit={handleCreateComments}>
      <HStack>
        <Input { ...comment } size="sm"/>
        <Button type='submmit' size="sm">Comment</Button>
      </HStack>
    </form>
  </>
}

export default CommentForm