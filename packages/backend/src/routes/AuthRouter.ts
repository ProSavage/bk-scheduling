import express from "express";
import crypto from "crypto";

const authRouter = express.Router();



authRouter.post("/login", (req, res) => {
      const { email } = req.body;
      if (!email.endsWith("@auburn.edu")) {
            res.json({success: false, message: "You must use your Auburn email to login."});
            return;
      }
      console.log(`Login request for ${email}`);
      // generate a token.
      const token = crypto.randomBytes(32).toString("hex");
      console.log(`token is ${token}`);
      // save the token to the database.
      // send the token back to the client.
      res.json({ success: true });
})

authRouter.get("/redeem/:token", (req, res) => {
      const { token } = req.params;
      console.log(`Redeem request for ${token}`);

      res.json({ success: true });
})


export { authRouter }