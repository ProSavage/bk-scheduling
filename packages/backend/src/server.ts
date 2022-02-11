import express from "express";
import { connect } from "mongoose";
import { authRouter } from "./routes/AuthRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ "hello": "world" });
})

app.use("/auth", authRouter)

const PORT = 5001;
console.log("Attempting database connection...")
const connection = connect("mongodb://localhost:27017/auth").then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
