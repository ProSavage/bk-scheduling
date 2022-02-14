import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react"

interface AuthFormBaseProps {
    children: ReactNode
}

export const AuthFormBase: React.FC<AuthFormBaseProps> = ({ children }) => {
    return (
        <Flex flexGrow={1} width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Flex
                width={"350px"}
                background={"gray.700"}
                flexDir={"column"}
                alignItems={"center"}
                border={"1px"}
                borderColor={"gray.600"}
                padding={3}
                borderRadius={5}
            >
                {children}

            </Flex>
        </Flex>
    );
}