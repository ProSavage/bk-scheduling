import { NewUser, Schedule, User } from "@bk-scheduling/common";
import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Flex, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react"
import { API } from "../../api";

interface ScheduleDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    schedule: Schedule
    onDelete: () => void
}

export const ScheduleDeleteModal: React.FC<ScheduleDeleteModalProps> = ({ isOpen, onClose, schedule, onDelete }) => {



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Are you sure you want to delete this schedule?
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Clicking yes will delete the schedule "{schedule.name}".</Text>
                    <Text>This is a potentially unwanted action.</Text>
                    <Flex my={1}>
                        <Button flexGrow={1} colorScheme={"red"} mr={2} onClick={async () => {
                            await API.schedule.deleteSchedule(schedule._id);
                            onDelete()
                            onClose();
                        }}>Yes</Button>
                        <Button flexGrow={1} colorScheme={"green"} onClick={() => onClose()}>No</Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}