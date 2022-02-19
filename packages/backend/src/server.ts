import express from "express";
import { connect } from "mongoose";
import { authRouter } from "./routes/AuthRouter";
import cors from "cors";
import { scheduleRouter } from "./routes/ScheduleRouter";
import morgan from "morgan";
const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.json({ "hello": "world" });
})

app.use("/auth", authRouter)
app.use("/schedule", scheduleRouter)

const PORT = 5001;
console.log("Attempting database connection...")
const connection = connect("mongodb://localhost:27017/bk-scheduling").then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
