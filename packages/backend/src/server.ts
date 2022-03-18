import express from "express";
import { connect } from "mongoose";
import { authRouter } from "./routes/AuthRouter";
import cors from "cors";
import { scheduleRouter } from "./routes/ScheduleRouter";
import morgan from "morgan";
import { Sessions } from "./database/models/Session";
import { Users } from "./database/models/User";
import { attachMiddleware } from "./util/Middleware";
import shortid from "shortid";
const app = express();

app.use((req, res, next) => attachMiddleware(req, res, next))
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.json({ "hello": "world" });
})

app.use("/auth", authRouter)


// ALL ROUTERS UNDER THIS POINT REQUIRE AUTHENTICATION.

app.use(async (req, res, next) => {
    const token = req.headers["authorization"]?.split("Bearer ")[1];
    if (!token || token.length !== 32) {
        console.log("No token found.");
        res.failureWithMessage("Token not provided.", 401)
        return;
    }

    const session = await Sessions.findOne({ token });
    if (!session) {
        console.log("Invalid session");
        res.failureWithMessage("Invalid session.", 401);
        return;
    }


    const user = await Users.findOne({ _id: session.user });

    if (!user) {
        console.log("User for this token was not found.");
        res.failureWithMessage("User for this token was not found.", 401);
        return;
    }

    req.user = user;
    console.log("authorized", user.email)
    next()
})
app.use("/schedule", scheduleRouter)

const PORT = 5001;
console.log("Attempting database connection...")
const connection = connect("mongodb://localhost:27017/bk-scheduling").then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
       
    });
});
