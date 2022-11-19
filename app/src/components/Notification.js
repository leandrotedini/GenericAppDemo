import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectNotification } from '../features/notification/notificationSlice'
import { useToast } from '@chakra-ui/react'



const Notification = () => {

  const { description, status } = useSelector(selectNotification)
  const toast = useToast()

  useEffect(() => {
    if (description !== ''){
      toast({
        description,
        status,
        duration: 5000,
        position: 'bottom',
        isClosable: true,
      })
    }
  }, [description])

}

export default Notification