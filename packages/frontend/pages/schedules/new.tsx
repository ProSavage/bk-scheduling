import { Box, Button, Flex, FormErrorMessage, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FormInputField } from "../../components/util/FormControlField";
import { WeekDay } from "@bk-scheduling/common";
import { API, transformValidationErrorsForForm } from "../../api";
import { useRouter } from "next/router";
const NewSchedule = () => {

    const daysOfWeekBorderColor = (ifError: boolean) => {
        return ifError ? "#E53E3E" : "#718096";
    }

    const router = useRouter();

    return <Flex flexDir={"column"} p={4} alignItems={"center"} width={"100%"}>
        <Text fontWeight={"bold"} fontSize={"3xl"}>Schedule Setup</Text>
        <Box minWidth={"xs"}>
            <Formik
                initialValues={{
                    name: "My Schedule",
                    intervalsPerDay: 6,
                    timeIntervalInMinutes: 30,
                    startTimeHour: 8,
                    startTimeMinute: 0,
                    daysOfWeek: []
                }}
                onSubmit={async (values, { setErrors }) => {
                    // Do stuff
                    console.log("sending...", values);
                    const response  = await API.schedule.newSchedule(
                        values.name,
                        values.intervalsPerDay,
                        values.timeIntervalInMinutes,
                        values.daysOfWeek,
                        values.startTimeHour,
                        values.startTimeMinute
                    );
                    const { errors, success, schedule } = response.data;

                    if (success) {
                        console.log("Created..")
                        console.log(response.data);
                        router.push("/schedules/roster/[id]", `/schedules/roster/${schedule._id}`);
                        return;
                    } 

                    setErrors(transformValidationErrorsForForm(errors));
                    console.log(transformValidationErrorsForForm(errors))

                }}
            >
                {({ values, isSubmitting, errors }) => (
                    <Form style={{ width: "100%" }}>
                        <Box my={1}>
                            <FormInputField
                                name={"name"}
                                label={"Schedule Name"}
                                placeholder={values?.name}
                                helper={"Name of your schedule"}
                            />
                        </Box>
                        <Box my={1}>
                            <FormInputField
                                name={"timeIntervalInMinutes"}
                                label={"Time Intervals"}
                                placeholder={values?.timeIntervalInMinutes.toString()}
                                helper={"Intervals are in minutes"}
                            />
                        </Box>
                        <Box my={1}>
                            <FormInputField
                                name={"intervalsPerDay"}
                                label={"Intervals Per Day"}
                                type={"number"}
                                placeholder={values?.intervalsPerDay.toString()}
                                helper={"How many time intervals are in a day?"}
                            />
                        </Box>
                        <Flex flexDir={"row"}>
                            <Box flexGrow={1} mr={1} my={1}>
                                <FormInputField
                                    name={"startTimeHour"}
                                    label={"Start Time Hour"}
                                    type={"number"}
                                    placeholder={values?.startTimeHour.toString()}
                                    helper={"What hour does your schedule start?"}
                                />
                            </Box>
                            <Box flexGrow={1} my={1}>
                                <FormInputField
                                    name={"startTimeMinute"}
                                    label={"Start Time Minute"}
                                    type={"number"}
                                    placeholder={values?.startTimeMinute.toString()}
                                    helper={"What minute does your schedule start?"}
                                />
                            </Box>
                        </Flex>
                        <Box>

                        </Box>
                        <Box>
                            <Text fontWeight={"medium"}>
                                Days of the week
                            </Text>
                            <Flex
                                my={2}
                                flexWrap={"wrap"}
                                justifyContent="center"
                                border={"1px solid " + daysOfWeekBorderColor(!!errors?.daysOfWeek)}
                                p={1}
                                borderRadius={5}
                            >
                                {Object.values(WeekDay)
                                    .map((dayofWeek) => <Box m={1} key={dayofWeek}>
                                        <FormInputField
                                            name={"daysOfWeek"}
                                            label={`${dayofWeek.charAt(0).toUpperCase()}${dayofWeek.slice(1)}`}
                                            variant={"checkbox"}
                                            value={dayofWeek}
                                            placeholder={"test"}
                                            showError={false}
                                        />
                                    </Box>)}

                            </Flex>
                            {errors?.daysOfWeek &&
                                <Text color={"error"}>Error: {errors["daysOfWeek"]}</Text>
                            }
                        </Box>
                        <Flex my={5} width={"100%"} justifyContent={"center"}>
                            <Button type={"submit"} isLoading={isSubmitting}>
                                Submit Schedule
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Box>

    </Flex>
}

export default NewSchedule;