import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createPosts } from '../../features/posts/postsSlice'
import { setNotification } from '../../features/notification/notificationSlice'
import { useField } from '../../hooks/index'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

const PostForm = ({ isOpen, onClose }) => {
  const [ buttonDisabled, setButtonDisabled ] = useState(true)
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  const dispatch = useDispatch()

  useEffect(() => {
    setButtonDisabled(title.value === ''
      || author.value === ''
      || url.value === '')
  }, [title, author, url])

  const closeModal = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
    onClose()
  }

  const handleCreatePost = async (event) => {
    event.preventDefault()

    const newPost = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      dispatch(createPosts(newPost))
      dispatch(setNotification({
        description: 'new Post created',
        status: 'success'
      }))

      closeModal()
    } catch (exception) {
      dispatch(setNotification({
        description: exception,
        status: 'error'
      }))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form data-test-id="post-form" onSubmit={handleCreatePost}>
          <ModalHeader>
            <Heading>Create New</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input { ...title } />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="author" isRequired>
                <FormLabel>Author</FormLabel>
                <Input { ...author } />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="url" isRequired>
                <FormLabel>URL</FormLabel>
                <Input { ...url } />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg='gray.400'
              color={'white'}
              _hover={{
                bg: 'gray.500',
              }}
              mr={3}
              onClick={closeModal}>
              Close
            </Button>
            <Button
              type="submit"
              bg='blue.400'
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              isDisabled={buttonDisabled}>
                Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PostForm