import { WeekDay, Schedule } from "@bk-scheduling/common";
import express from "express";
import { body, Meta, validationResult } from "express-validator";
import shortid from "shortid";
import { Schedules } from "../database/models/Schedule";
import { Users } from "../database/models/User";

const scheduleRouter = express.Router();
const MINUTES_IN_A_DAY = 60 * 24;
scheduleRouter.post("/new",
    body("name")
        .isString().withMessage("Name must be a string")
        .bail()
        .isLength({ min: 4 }).withMessage("Name must be at least 4 characters long"),
    body(["intervalsPerDay", "timeIntervalInMinutes"])
        .isNumeric().withMessage("Value must be a number")
        .bail()
        .toInt()
        .custom(number => number > 0).withMessage("Value must be greater than 0")
        .bail()
        .if((_value: any, { path }: Meta) => path === "timeIntervalInMinutes")
        .custom((number) => number < MINUTES_IN_A_DAY).withMessage("Time interval cannot be greater than a day"),
    body("daysOfWeek")
        .isArray().withMessage("Value must be an array")
        .bail()
        .isLength({ min: 1, max: 7 }).withMessage("Value must be an array of length 1-7")
        .bail()
        .custom((array) => array.every((day: any) => Object.values(WeekDay).includes(day))).withMessage("Value must be an array of valid days"),
    body("startTimeHour")
        .isNumeric().withMessage("Value must be number")
        .bail()
        .toInt()
        .custom((number) => number >= 0 && number <= 23).withMessage("Hour must be between 0-23"),
    body("startTimeMinute")
        .isNumeric().withMessage("Value must be number")
        .bail()
        .toInt()
        .custom((number) => number >= 0 && number <= 59).withMessage("Minute must be between 0-59"),
    async (req, res) => {
        const { name, intervalsPerDay, timeIntervalInMinutes, daysOfWeek, startTimeHour, startTimeMinute } = req.body;
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            res.failure(errors.array());
            return
        }

        // Is timeIntervalInMinutes * intervalsPerDay less than a day
        if (timeIntervalInMinutes * intervalsPerDay > MINUTES_IN_A_DAY) {
            res.failureValidation("intervalsPerDay", "Time interval * intervals per day cannot be greater than a day")
            return;
        }

        // Create the schedule
        const schedule: Schedule = {
            _id: shortid.generate(),
            name,
            intervalsPerDay,
            timeIntervalInMinutes,
            daysOfWeek,
            owner: req.user._id,
            startTime: {
                hour: startTimeHour,
                minute: startTimeMinute
            }
        }


        await Schedules.create(schedule);
        res.success({schedule})
    });

scheduleRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const schedule = await Schedules.findOne({ _id: id, owner: req.user._id });
    if (!schedule) {
        res.json({ success: false, error: "Schedule not found" });
        return;
    }

    if (schedule.owner !== req.user._id) {
        res.failure("You do not have permission to delete this schedule.");
        return;
    }

    await Schedules.deleteOne({ _id: id });

    res.json({ success: true });
})

scheduleRouter.get("/:id/roster", async (req, res) => {
    const { id } = req.params;
    const schedule = await Schedules.findOne({ _id: id });
    if (!schedule) {
        res.failure("Schedule not found");
        return;
    }

    if (schedule.owner !== req.user._id) {
        res.json("You do not own this schedule");
        return;
    }

    const roster = await Users.find({ schedules: { $in: schedule._id } })
    res.json(roster);
})

scheduleRouter.get("/:id", async (req, res) => {
    const schedule = await Schedules.findOne({ _id: req.params.id });
    if (!schedule) {
        res.failure("Schedule not found.");
        return
    }

    if (schedule.owner !== req.user._id) {
        res.failure("You do not have permission to view this schedule.");
        return;
    }

    res.json(schedule);
})



scheduleRouter.get("/", async (req, res) => {
    const schedules = await Schedules.find({ owner: req.user._id });
    res.json(schedules);
})


//get all

export { scheduleRouter };