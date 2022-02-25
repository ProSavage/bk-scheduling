import { WeekDay, Schedule } from "@bk-scheduling/common";
import express from "express";
import shortid from "shortid";
import { Schedules } from "../database/models/Schedule";
import { Users } from "../database/models/User";

const scheduleRouter = express.Router();


scheduleRouter.post("/new", async (req, res) => {
    const { name, intervalsPerDay, timeIntervalInMinutes, daysOfWeek } = req.body;
    console.log({ name, intervalsPerDay, timeIntervalInMinutes, daysOfWeek })
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
            res.json({
                success: false, error: {
                    message: "Invalid day of the week '" + day + "'",
                    field: "daysOfWeek"
                }
            });
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
        owner: req.user._id
    }


    await Schedules.create(schedule);

    res.json({ success: true, schedule })
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
    res.json( roster );
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