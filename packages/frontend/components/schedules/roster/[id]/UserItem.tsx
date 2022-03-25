import { User } from "@bk-scheduling/common";
import { Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import React from "react"
import { Edit2, Trash, Trash2 } from "react-feather";
import { schedule } from "../../../../api/schedule";

interface UserItemProps {
    user: User;
    scheduleId: string | undefined;
    refreshUsers: () => void,
}

export const UserItem: React.FC<UserItemProps> = ({ user, scheduleId, refreshUsers }) => {

    const toast = useToast()

    const onDelete = async () => {
        if (!scheduleId) {
            toast({
                title: "Schedule id is required",
                description: "Internal Error: schedule id is not present",
                status: "error",
                duration: 10000,
                isClosable: true
            })
            return
        }
        const res = await schedule.deleteUserFromScheduleRoster(scheduleId, user)
        console.log("data", res)
        refreshUsers()
    }

    return (
        <Flex width={"100%"} backgroundColor={"gray.500"} borderRadius={5} p={3} alignItems={"center"} justifyContent={"space-between"} my={1}>
            <Flex flexDir={"column"}>
                <Text fontSize={"medium"} fontWeight={"medium"}>{user.firstName} {user.lastName}</Text>
                <Text fontStyle={"italic"}>{user.email}</Text>
            </Flex>
            <Flex>
                <IconButton variant={"ghost"} size={"md"} aria-label="edit" icon={<Edit2 />} />
                <IconButton variant={"ghost"} size={"md"} aria-label="delete" icon={<Trash2 />} onClick={() => onDelete()} />
            </Flex>
        </Flex>
    );
}