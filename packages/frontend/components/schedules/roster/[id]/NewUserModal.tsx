import { UserInfo } from "@bk-scheduling/common";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react"
import { schedule } from "../../../../api/schedule";
import { FormInputField } from "../../../util/FormControlField";

interface NewUserModalProps {
    scheduleId: string | undefined;
    updateUsers(): void
    isOpen: boolean;
    onClose: () => void;
    existingUsers: UserInfo[]
}

export const NewUserModal: React.FC<NewUserModalProps> = ({ scheduleId, updateUsers, isOpen, onClose, existingUsers }) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Create New User
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={{ firstName: "", lastName: "", email: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const errors: any = {}
                            const existingUserWithEmail = existingUsers.find(user => user.email === values.email);
                            if (existingUserWithEmail) {
                                errors.email = "User with this email already exists"
                            }

                            if (values.firstName === "") {
                                errors.firstName = "First name is required"
                            }

                            if (values.lastName === "") {
                                errors.lastName = "Last name is required"
                            }

                            if (values.email === "") {
                                errors.email = "Email is required"
                            }

                            if (!values.email.endsWith("@auburn.edu")) {
                                errors.email = "Must be an auburn email"
                            }

                            if (Object.keys(errors).length > 0) {
                                setErrors(errors)
                                return;
                            }

                            if (!scheduleId) {
                                errors.email = "Schedule id is required (internal error)"
                            }

                            const { success } = await schedule.inviteUserToScheduleRoster(
                                scheduleId!!,
                                values
                            )
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
                                <FormInputField
                                    name={"email"}
                                    label={"Email"}
                                    placeholder={values?.email}
                                    helper={"User's auburn email."}
                                />
                                <Button isLoading={isSubmitting} width={"100%"} my={2} type={"submit"}>
                                    Add User
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}