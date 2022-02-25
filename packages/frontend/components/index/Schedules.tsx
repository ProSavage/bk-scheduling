import { Schedule } from "@bk-scheduling/common";
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react"
import { API } from "../../api";
import { axiosClient } from "../../api/axios";
import { ScheduleItem } from "./ScheduleItem";

interface SchedulesProps {

}

export const Schedules: React.FC<SchedulesProps> = ({ }) => {

    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        fetchSchedule()
    }, [])

    const fetchSchedule = async () => {
        API.schedule.getSchedules().then(data => {
            setSchedules(data);
        })
    }

    return (
        <Flex width={"100%"} flexDir={"column"} my={4}>
            {schedules?.map(schedule => <ScheduleItem schedule={schedule} refresh={() => fetchSchedule()} />)}
        </Flex>
    );
}