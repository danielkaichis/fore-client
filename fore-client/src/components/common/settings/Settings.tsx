import React from "react";
import { 
    Center, 
    Icon, 
    Tooltip, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Button
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/hooks";

const Settings = (): React.ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <Center py={5}>
            <Tooltip hasArrow label="Settings" bg='black' color='white' placement="right" borderRadius={5}>
                <Center>
                    <Icon color={isOpen ? "white" : "#9f9f9f"} 
                        _hover={{color: "white"}} 
                        as={FaCog} 
                        fontSize="2xl" 
                        cursor="pointer"
                        onClick={onOpen}
                    />
                </Center>
            </Tooltip>
            {/* allow to update settings if logged in, or show message if not */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Sample text
                    </ModalBody>

                    <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
};

export default Settings;
