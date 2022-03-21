import { NewUser, Schedule, User } from "@bk-scheduling/common";
import { Button, Flex, Text, Heading, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { NewUserModal } from "../../../components/schedules/roster/[id]/NewUserModal";
import { UserItem } from "../../../components/schedules/roster/[id]/UserItem";

const Roster: NextPage = () => {

    const [schedule, setSchedule] = useState<Schedule>();

    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();


    // Original users represents the "Curerent Members" in the database.
    const [originalUsers, setOriginalUsers] = useState<User[]>([]);
    // These are the modified set of Current Members, 
    // this is mostly here in case the user wants to edit any existing original users

    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const id = router.query.id as string;
        API.schedule.getSchedule(id).then(data => {
            setSchedule(data);
        })
        API.schedule.getScheduleRoster(id).then(data => {
            setOriginalUsers(data)
            setUsers(data);
        })

    }, [])

    // Checks if the admin has modified any existing users first.
    // 1. check if any existing users are deleted.
    // 2. check if any new members have been added.
    // 3. check if any existing users have been modified.
    const areUsersTheSame = () => {
        if (users.length !== originalUsers.length) return false;
        for (const user of users) {
            const originalUser = originalUsers.find(u => u === user);
            if (!originalUser) return false;
        }
        return true;
    }

    return <Flex width={"100%"} flexDir={"column"} m={4}>
        <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"} my={2}>
            <Heading size="lg">
                {schedule?.name}'s Roster
            </Heading>
            <Flex>
                <Button onClick={onOpen}>New User</Button>
                <Button variant={"solid"} colorScheme={"blue"} ml={2} isDisabled={areUsersTheSame()}>Save Changes</Button>
            </Flex>
        </Flex>
        <Text fontSize={"xl"}>Current Members:</Text>
        <Flex width={"100%"} my={1}>
            {users.map(user => <UserItem key={user._id} firstName={user.firstName} lastName={user.lastName} email={user.email} onDelete={() => {setUsers(users.filter(u => u !== user))}} onEdit={() => { }} />)}
        </Flex>
        <Text fontSize={"xl"}>New Members:</Text>
        <NewUserModal isOpen={isOpen} onClose={onClose}  existingUsers={users} />
    </Flex>
}

export default Roster;