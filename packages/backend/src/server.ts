import express from "express";
import { Mongoose as mongoose } from "mongoose";
import { authRouter } from "./routes/AuthRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ "hello": "world" });
})

app.use("/auth", authRouter)

const PORT = 5001;
const connection = mongoose.createConnection({
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});