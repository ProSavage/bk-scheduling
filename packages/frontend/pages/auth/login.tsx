import { AuthFormBase } from "../../components/auth/AuthFormBase";
import { Text, Box, Button, useDisclosure } from "@chakra-ui/react";
import { Formik, Form } from "formik"
import React from "react";
import { FormInputField } from "../../components/util/FormControlField";
import { API, transformValidationErrorsForForm } from "../../api";
import { EmailLinkModal } from "../../components/auth/login/EmailLinkModal";

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return <AuthFormBase>
        <Text my={2} fontWeight={"bold"} fontSize={"2xl"}>Magic Login ✨</Text>
        <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
                const response = await API.auth.login(values.email);
                const { success, errors } = response.data;
                if (success) {
                    onOpen();
                    return;
                }

                setErrors(transformValidationErrorsForForm(errors));
            }}
        >
            {({ values, isSubmitting }) => (
                <Form style={{ width: "100%" }}>
                    <Box my={1}>
                        <FormInputField
                            name={"email"}
                            label={"Email"}
                            placeholder={values?.email}
                            helper={"Your auburn email"}
                        />
                    </Box>

                    <Box mt={2} width={"100%"}>
                        <Button
                            type={"submit"}
                            isLoading={isSubmitting}
                            //   colorScheme={"blue"}
                            width={"100%"}
                        >Get Magic Link</Button>
                    </Box>
                </Form>
            )}
        </Formik>
        <EmailLinkModal isOpen={isOpen} onClose={onClose} />
    </AuthFormBase>
}

export default Login;