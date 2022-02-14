import { AuthFormBase } from "../../components/auth/AuthFormBase";
import { Text, Box, Button, Link, useDisclosure } from "@chakra-ui/react";
import { Formik, Form } from "formik"
import React from "react";
import { useRouter } from "next/router";
import { FormInputField } from "../../components/util/FormControlField";
import { API } from "../../api";
import { EmailLinkModal } from "../../components/auth/login/EmailLinkModal";

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return <AuthFormBase>
        <Text my={2} fontWeight={"bold"} fontSize={"2xl"}>Magic Login ✨</Text>
        <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
                const { success, token, error } = await API.auth.login(values.email);
                if (error) {
                    setErrors({ email: error })
                    return;
                }
                if (success) {
                    onOpen();
                }
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
                    {/* <Text textAlign={"center"} my={2}>Don't have an account? <Link href={"/auth/signup"} color={"blue.300"}>Signup</Link></Text> */}

                </Form>
            )}
        </Formik>
        <EmailLinkModal isOpen={isOpen} onClose={onClose}/>
    </AuthFormBase>
}

export default Login;