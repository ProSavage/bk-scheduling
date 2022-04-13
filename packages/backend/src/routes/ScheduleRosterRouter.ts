import { Schedule } from "@bk-scheduling/common";
import express, { Request } from "express";
import { body, validationResult } from "express-validator";
import shortid from "shortid";
import { Schedules } from "../database/models/Schedule";
import { Users } from "../database/models/User";

const scheduleRosterRouter = express.Router();

interface ScheduleRequest extends Request<{ id: string; }, any, any, any, Record<string, any>> {
      schedule: Schedule;
}

scheduleRosterRouter.use("/:id/roster", async (req, res, next) => {
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
      console.log("continue")
      next();
})

scheduleRosterRouter.post("/:id/roster/edit",
      body("userId").isString().withMessage("roster member's id must be string")
            .bail()
            .custom(id => shortid.isValid(id)).withMessage("invalid shortid."),
      body("firstName").isString().withMessage("roster member's name must be string"),
      body("lastName").isString().withMessage("roster member's name must be string"),
      async (expressRequest, res) => {
            const errors = validationResult(expressRequest);
            if (!errors.isEmpty()) {
                  res.failure(errors.array());
                  return
            }
            const req = expressRequest as ScheduleRequest;
            const userId = req.body.userId;
            console.log({userId, firstName: req.body.firstName, lastName: req.body.lastName})
            await Users.updateOne({ _id: userId }, { $set: { firstName: req.body.firstName, lastName: req.body.lastName } })
            res.success({});
      })



scheduleRosterRouter.get("/:id/roster", async (expressRequest, res) => {
      const req = expressRequest as ScheduleRequest;
      const roster = await Users.find({ schedules: { $in: req.schedule._id } })
      res.success({ roster });
})

scheduleRosterRouter.post("/:id/roster/invite",
      body("email").isString().withMessage("roster member's email must be string")
            .bail()
            .isEmail().withMessage("roster member's email must be a valid email address")
            .normalizeEmail(),
      body("firstName").isString().withMessage("roster member's name must be string")
            .bail()
            .isLength({ min: 1 }).withMessage("roster member's name must be at least 1 character")
      ,
      body("lastName").isString().withMessage("roster member's name must be string")
            .bail()
            .isLength({ min: 1 }).withMessage("roster member's name must be at least 1 character")
      ,
      async (expressRequest, res) => {

            const errors = validationResult(expressRequest);
            if (!errors.isEmpty()) {
                  res.failure(errors.array());
                  return
            }
            const req = expressRequest as ScheduleRequest;
            const email = req.body.email;

            let user = await Users.findOne({ email });

            if (!user) {
                  user = await Users.create({
                        _id: shortid.generate(),
                        email: req.body.email,
                        isAdmin: false,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        schedules: []
                  })
            }

            await Users.updateOne({ _id: user._id }, { $addToSet: { schedules: req.schedule._id } })

            res.success({});
      })

scheduleRosterRouter.post("/:id/roster/delete",
      body("userId").isString().withMessage("roster member's id must be string")
            .bail()
            .custom(id => shortid.isValid(id)).withMessage("invalid shortid."),
      async (expressRequest, res) => {
            const errors = validationResult(expressRequest);
            if (!errors.isEmpty()) {
                  res.failure(errors.array());
                  return
            }
            const req = expressRequest as ScheduleRequest;
            const userId = req.body.userId;
            console.log(userId, "userId", req.schedule._id, "scheduleId")
            await Users.updateOne({ _id: userId }, { $pull: { schedules: req.schedule._id } })

            res.success({});

      })



export { scheduleRosterRouter }