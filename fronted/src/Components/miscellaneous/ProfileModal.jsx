// ProfileModal.js
import { ViewIcon } from '@chakra-ui/icons'
import {
    useDisclosure,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Avatar,
    Text,
    Center,
    Image
} from '@chakra-ui/react'
import { useContext } from 'react'
import { ChatContext } from '../../Context/ChatProvider'

const ProfileModal = ({children, user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(user)
    return <>
    {
        children ? <span onClick={onOpen}>{children}</span> : (
            <IconButton 
            display={{base:"flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}
            />
        )
    }
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>My Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center>
                    <Image
                    src={user.pic}
                    alt={user.name}
                    />
                    </Center>
                    <Text> <b>Name:</b> {user.name}</Text> 
                    <Text> <b>Email:</b> {user.email}</Text> 
                    
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
       
   
    </>
}

export default ProfileModal
