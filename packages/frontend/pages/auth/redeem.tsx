import { AuthFormBase } from "../../components/auth/AuthFormBase";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../../api";
import { CheckCircle, X, XCircle } from "react-feather";
import { setToken } from "../../api/axios";
import Link from "next/link";
const Redeem = () => {

    const enum TokenStatus {
        LOADING = "loading",
        SUCCESS = "success",
        ERROR = "error",
        NO_TOKEN = "no token",
    }


    const router = useRouter();
    const [tokenStatus, setTokenStatus] = useState<TokenStatus>(TokenStatus.LOADING);
    const [error, setError] = useState("")
    useEffect(() => {
        validateToken();
    }, [router])

    const validateToken = async () => {
        const token = router.query.token;
        if (!token || typeof token !== "string") {
            setTokenStatus(TokenStatus.NO_TOKEN);
            backToRoute("/auth/login");
            return;
        }

        const { success, session, error } = await API.auth.redeem(token);

        if (error) {
            setError(error);
            setTokenStatus(TokenStatus.ERROR);
            backToRoute("/auth/login");
            return;
        }

        if (success) {
            setTokenStatus(TokenStatus.SUCCESS);
            window.localStorage.setItem("token", session.token);
            setToken(session.token);
            backToRoute("/");
            return;
        }
    }

    const backToRoute = (route: string) => {
        setTimeout(() => router.push(route), 5000)
    }

    const statusText = (text: string) => {
        return <Text my={2} fontWeight={"bold"} fontSize={"lg"}>{text}</Text>
    }

    const nextStep = () => {
        if (tokenStatus === TokenStatus.LOADING) {
            return null
        } else if (tokenStatus === TokenStatus.SUCCESS) {
            return <Link href={"/dashboard"}>
                <Text color={"link"}>Going to Dashboard in 5 seconds...</Text>
            </Link>
        } else {
            return <Link href={"/auth/login"}>
                <Text color={"link"}>Going back to login in 5 seconds...</Text>
            </Link>
        }
    }

    const renderTokenStatus = () => {
        switch (tokenStatus) {
            case TokenStatus.LOADING:
                return <>
                    <Spinner m={4} />
                    {statusText("Redeeming Magic Link... ")}
                </>
            case TokenStatus.NO_TOKEN:
                return <>
                    <Box m={4}>
                        <XCircle size={32} color={"#F56565"} />
                    </Box>
                    {statusText("No token found")}
                </>
            case TokenStatus.ERROR:
                return <>
                    <Box m={4}>
                        <XCircle size={32} color={"#F56565"} />
                    </Box>
                    {statusText(error)}
                </>
            case TokenStatus.SUCCESS:
                return <>
                    <Box m={4}>
                        <CheckCircle size={32} color={"#48BB78"} />
                    </Box>
                    {statusText("Successfully logged in...")}
                </>
        }
    }

    return <AuthFormBase>
        <Flex display={"inline-flex"} alignItems={"center"}>
            {renderTokenStatus()}
        </Flex>
        <Flex>
            {nextStep()}
        </Flex>
    </AuthFormBase>
}

export default Redeem;