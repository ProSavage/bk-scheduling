import { Schedule } from "@bk-scheduling/common";
import { Button, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react"
import { Trash2, Users } from "react-feather";
import { ScheduleDeleteModal } from "./ScheduleDeleteModal";

interface ScheduleItemProps {
    schedule: Schedule,
    refresh: () => void
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule, refresh }) => {


    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <Flex cursor={"pointer"} flexDir={"column"} width={"100%"} backgroundColor={"gray.500"} my={2} p={3} borderRadius={5}>
            <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"lg"} color={"white"} fontWeight={"bold"}>{schedule.name}</Text>
                <Flex>
                    <IconButton
                        aria-label="edit users"
                        variant={"ghost"}
                        icon={<Users />}
                        onClick={() => router.push("/schedules/roster/[id]", `/schedules/roster/${schedule._id}`)}
                    />
                    <IconButton
                        aria-label="delete"
                        variant={"ghost"}
                        icon={<Trash2 />}
                        onClick={() => onOpen()}
                    />
                </Flex>
            </Flex>
            <Text fontStyle={"italic"}>0 members on roster.</Text>
            <ScheduleDeleteModal isOpen={isOpen} onClose={onClose} schedule={schedule} onDelete={() => refresh()} />
        </Flex>
    );
}