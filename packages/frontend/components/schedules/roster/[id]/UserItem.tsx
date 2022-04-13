import { User, UserInfo } from "@bk-scheduling/common";
import { Flex, IconButton, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react"
import { Edit2, Trash2 } from "react-feather";
import { schedule } from "../../../../api/schedule";
import { EditUserModal } from "./EditUserModal";

interface UserItemProps {
    user: User;
    scheduleId: string | undefined;
    refreshUsers: () => void,
    existingUsers: UserInfo[],

}

export const UserItem: React.FC<UserItemProps> = ({ user, scheduleId, refreshUsers, existingUsers }) => {

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
        refreshUsers()
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex width={"100%"} backgroundColor={"gray.500"} borderRadius={5} p={3} alignItems={"center"} justifyContent={"space-between"} my={1}>
            <Flex flexDir={"column"}>
                <Text fontSize={"medium"} fontWeight={"medium"}>{user.firstName} {user.lastName}</Text>
                <Text fontStyle={"italic"}>{user.email}</Text>
            </Flex>
            <Flex>
                <Tooltip label={"Edit User Info"}>
                    <IconButton variant={"ghost"} size={"md"} aria-label="edit" icon={<Edit2 />} onClick={() => onOpen()} />
                </Tooltip>
                <Tooltip label={"Remove user from roster."}>
                    <IconButton variant={"ghost"} size={"md"} aria-label="delete" icon={<Trash2 />} onClick={() => onDelete()} />
                </Tooltip>
            </Flex>
            <EditUserModal
                scheduleId={scheduleId}
                user={user}
                isOpen={isOpen}
                onClose={onClose}
                existingUsers={existingUsers}
                updateUsers={() => refreshUsers()}
            />
        </Flex>
    );
}