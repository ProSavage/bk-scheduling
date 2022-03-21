import { Schedule } from "@bk-scheduling/common";
import express, { Request } from "express";
import { Schedules } from "../database/models/Schedule";
import { Users } from "../database/models/User";

const scheduleRosterRouter = express.Router();

interface ScheduleRequest extends Request<{ id: string; }, any, any, any, Record<string, any>> {
      schedule: Schedule;
}

scheduleRosterRouter.use(async (req, res, next) => {
      const { id } = req.params;
      const schedule = await Schedules.findOne({ _id: id });
      if (!schedule) {
            res.failureWithMessage("Schedule not found");
            return;
      }

      if (schedule.owner !== req.user._id) {
            res.failureWithMessage("You do not own this schedule");
            return;
      }


      (req as ScheduleRequest).schedule = schedule;

      next();
})


scheduleRosterRouter.get("/", async (expressRequest, res) => {
      const req = expressRequest as ScheduleRequest;
      const roster = await Users.find({ schedules: { $in: req.schedule._id } })
      res.json(roster);
})

scheduleRosterRouter.patch("/")


export { scheduleRosterRouter }