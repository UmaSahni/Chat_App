// ProfileModal.js
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Image,
} from '@chakra-ui/react'

const ProfileModal = ({ isOpen, onClose,  }) => {
    const { email, name, pic } = JSON.parse(localStorage.getItem("userInfo"))
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image src={pic} />
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    {/* You can add more user details here */}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ProfileModal
