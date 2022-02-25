import express from "express";
import crypto from "crypto";
import { isExpired, LoginTokens } from "../database/models/LoginToken";
import shortid from "shortid";
import { Sessions } from "../database/models/Session";
import { Users } from "../database/models/User";

const authRouter = express.Router();



authRouter.post("/login", async (req, res) => {
      const { email } = req.body;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.json({ success: false, error: "Invalid email." });
            return;
      }
      if (!email.endsWith("@auburn.edu")) {
            res.json({ success: false, error: "You must use your Auburn email to login." });
            return;
      }

      const user = await Users.findOne({ email });
      if (!user) {
            res.json({ success: false, error: "You haven't been whitelisted on this platform." });
            return;
      }
      console.log(`Login request for ${email}`);
      // generate a token.
      const tokenStr = crypto.randomBytes(32).toString("hex");
      console.log(`http://localhost:3000/auth/redeem?token=${tokenStr}`);
      // save the token to the database.
      const tokenDoc = {
            _id: shortid.generate(),
            token: tokenStr,
            userEmail: email,
            createdAt: new Date(),
            activated: false
      }
      await LoginTokens.create(tokenDoc)
      // send the token back to the client.
      // TODO: REMOVE THE TOKEN IN THE RESPONSE - ONCE THERE ARE EMAILS.
      res.json({ success: true, token: tokenDoc.token });
})

authRouter.get("/redeem/:token", async (req, res) => {
      const { token } = req.params;
      console.log(`Redeem request for ${token}`);
      const tokenDoc = await LoginTokens.findOne({ token });
      if (!tokenDoc) {
            res.json({ success: false, error: "Invalid token." });
            return;
      }
      if (isExpired(tokenDoc)) {
            res.json({ success: false, error: "Token has expired." });
            return;
      }
      if (tokenDoc.activated) {
            res.json({ success: false, error: "Token has already been used." });
            return
      }

      // Activate the token.
      tokenDoc.activated = true;
      tokenDoc.save();

      const user = await Users.findOne({ email: tokenDoc.userEmail });
      if (!user) {
            res.failure("User not found.");
            return;
      }
      // Create a session.
      const session = {
            _id: shortid.generate(),
            token: crypto.randomBytes(16).toString("hex"),
            user: user._id,
      }
      await Sessions.create(session)
      res.json({ success: true, session });
})


export { authRouter }