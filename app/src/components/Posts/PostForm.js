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
  Textarea
} from '@chakra-ui/react'

const PostForm = ({ isOpen, onClose }) => {
  const [ buttonDisabled, setButtonDisabled ] = useState(true)
  const { reset: resetContent, ...content } = useField('text')
  const dispatch = useDispatch()

  useEffect(() => {
    setButtonDisabled(content.value === '')
  }, [content])

  const closeModal = () => {
    resetContent()
    onClose()
  }

  const handleCreatePost = async (event) => {
    event.preventDefault()

    const newPost = {
      content: content.value
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
              <FormControl id="content">
                <Textarea
                  { ...content }
                  placeholder='Share what you want!'/>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg='gray.500'
              color={'white'}
              _hover={{
                bg: 'gray.600',
              }}
              mr={3}
              onClick={closeModal}>
              Close
            </Button>
            <Button
              type="submit"
              bg='blue.500'
              color={'white'}
              _hover={{
                bg: 'blue.600',
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