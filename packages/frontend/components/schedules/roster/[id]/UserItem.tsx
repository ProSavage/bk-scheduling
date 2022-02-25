import { User } from "@bk-scheduling/common";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react"
import { Edit2, Trash, Trash2 } from "react-feather";

interface UserItemProps {
    firstName: string,
    lastName: string,
    email: string,
    onDelete: () => void,
    onEdit: () => void
}

export const UserItem: React.FC<UserItemProps> = ({ firstName, lastName, email, onDelete }) => {
    return (
        <Flex width={"100%"} backgroundColor={"gray.500"} borderRadius={5} p={3} alignItems={"center"} justifyContent={"space-between"}>
            <Flex flexDir={"column"}>
                <Text fontSize={"medium"} fontWeight={"medium"}>{firstName} {lastName}</Text>
                <Text fontStyle={"italic"}>{email}</Text>
            </Flex>
            <Flex>
                <IconButton variant={"ghost"} size={"md"} aria-label="edit" icon={<Edit2 />} />
                <IconButton variant={"ghost"} size={"md"} aria-label="delete" icon={<Trash2 />} onClick={onDelete} />
            </Flex>
        </Flex>
    );
}