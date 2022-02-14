import { Modal, ModalBody, ModalCloseButton, Text, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react"

interface EmailLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EmailLinkModal: React.FC<EmailLinkModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent background={"gray.700"} color="white" p={3}>
                <ModalHeader>Verify Email ✉️</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Click the login link from the email we sent you to confirm your identity!</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}