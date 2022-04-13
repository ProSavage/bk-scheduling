import { User, UserInfo } from "@bk-scheduling/common";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react"
import { schedule } from "../../../../api/schedule";
import { FormInputField } from "../../../util/FormControlField";

interface EditUserModalProps {
    scheduleId: string | undefined;
    updateUsers(): void
    isOpen: boolean;
    onClose: () => void;
    existingUsers: UserInfo[]
    user: User
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ scheduleId, updateUsers, isOpen, onClose, existingUsers, user }) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Edit User
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={{ firstName: user.firstName, lastName: user.lastName }}
                        onSubmit={async (values, { setErrors }) => {
                            const errors: any = {}
                            if (values.firstName === "") {
                                errors.firstName = "First name is required"
                            }

                            if (values.lastName === "") {
                                errors.lastName = "Last name is required"
                            }

                            if (Object.keys(errors).length > 0) {
                                setErrors(errors)
                                return;
                            }

                            if (!scheduleId) {
                                errors.email = "Schedule id is required (internal error)"
                            }

                            // TODO: Send edit request.
                            console.log(user);
                            await schedule.editScheduleUser(scheduleId!!, user._id, values.firstName, values.lastName);
                            updateUsers()
                            onClose()
                        }}
                    >
                        {({ values, isSubmitting, errors }) => (
                            <Form style={{ width: "100%" }}>
                                <FormInputField
                                    name={"firstName"}
                                    label={"First Name"}
                                    placeholder={values?.firstName}
                                    helper={"First Name"}
                                />
                                <FormInputField
                                    name={"lastName"}
                                    label={"Last Name"}
                                    placeholder={values?.lastName}
                                    helper={"Last Name"}
                                />
                                <Button isLoading={isSubmitting} width={"100%"} my={2} type={"submit"}>
                                    Save Changes
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}