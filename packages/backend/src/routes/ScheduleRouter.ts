import { WeekDay } from "@bk-scheduling/common";
import express from "express";
import shortid from "shortid";
import { Schedule, Schedules } from "../database/models/Schedule";

const scheduleRouter = express.Router();


scheduleRouter.post("/new", async (req, res) => {
    const { name, intervalsPerDay, timeIntervalInMinutes, daysOfWeek } = req.body;

    // Validate input
    if (!name || !intervalsPerDay || !timeIntervalInMinutes || !daysOfWeek) {
        res.json({ success: false, error: "Missing fields" });
        return;
    }

    if (name.length < 4) {
        res.json({
            success: false, error: {
                message: "Name must be at least 4 characters long.",
                field: "name"
            }
        });
        return;
    }

    if (intervalsPerDay < 1) {
        res.json({
            success: false, error: {
                message: "Intervals per day must be at least 1",
                field: "intervalsPerDay"
            }
        });
        return;
    }

    if (timeIntervalInMinutes < 1) {
        res.json({
            success: false, error: {
                message: "Time interval must be at least 1 minute",
                field: "timeIntervalInMinutes"
            }
        });
        return;
    }

    // Is timeIntervalInMinutes less than a day
    const MINUTES_IN_A_DAY = 60 * 24;
    if (timeIntervalInMinutes > MINUTES_IN_A_DAY) {
        res.json({
            success: false, error: {
                message: "Time interval cannot be greater than a day",
                field: "timeIntervalInMinutes"
            }
        });
        return;
    }

    // Is timeIntervalInMinutes * intervalsPerDay less than a day
    if (timeIntervalInMinutes * intervalsPerDay > MINUTES_IN_A_DAY) {
        res.json({
            success: false, error: {
                message: "Time interval * intervals per day cannot be greater than a day",
                field: "intervalsPerDay"
            }
        });
        return;
    }

    // Is Days of the week valid
    if (daysOfWeek.length === 0 || daysOfWeek.length > 7) {
        res.json({
            success: false, error: {
                message: "Days of the week must be between 1 and 7",
                field: "daysOfWeek"
            }
        });
        return;
    }

    const validDays = Object.values(WeekDay);
    for (const day of daysOfWeek) {
        if (!validDays.includes(day)) {
            res.json({ success: false, error: { message: "Invalid day of the week '" + day + "'",
             field: "daysOfWeek" } });
            return;
        }
    }

    // Create the schedule
    const schedule: Schedule = {
        _id: shortid.generate(),
        name,
        intervalsPerDay,
        timeIntervalInMinutes,
        daysOfWeek,
        owner: "test"
    }

    await Schedules.create(schedule);

    res.json({ success: true })
});

//get all
scheduleRouter.get("/", async (req, res) => {
    //do stuff
})

//get one
scheduleRouter.get("/:id", async (req, res) => {
    //do stuff
})

//creating one
scheduleRouter.post("/", async (req, res) => {
    //do stuff
})

scheduleRouter.patch("/:id", async (req, res) => {
    //do stuff
})

export { scheduleRouter };