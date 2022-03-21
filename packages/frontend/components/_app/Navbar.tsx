import { Flex, Text, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react"
import { Key } from "react-feather";

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({ }) => {
    const router = useRouter();
    return (
        <Flex
            width={"100%"}
            p={3}
            bg={"gray.700"}
            justifyContent={"center"}
        >
            <Flex width={"100%"} maxW={"1280px"} justifyContent={"space-between"} alignItems={"center"}>
                <Text cursor={"pointer"} onClick={() => router.push("/")} fontWeight={"bold"} fontSize={"xl"}>BK-Scheduling</Text>
                <Flex>
                    <IconButton aria-label="login"
                        icon={<Key size={20} />} onClick={() => router.push("/auth/login")}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}