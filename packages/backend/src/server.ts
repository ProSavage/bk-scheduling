import express from "express";
import { authRouter } from "./routes/AuthRouter";

const app = express();



app.get("/", (req, res) => {
    res.json({ "hello": "world" });
})

app.use("/auth", authRouter)

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});