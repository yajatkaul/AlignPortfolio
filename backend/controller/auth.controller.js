import User from "../models/user.model.js";
import twilio from "twilio";

export const getOTP = async (req, res) => {
  try {
    const { number: number } = req.params;
    const { displayName } = req.query;
    let user = await User.findOne({ number, displayName });

    if (!user) {
      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      user = new User({
        displayName,
        number,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
      });

      //Saving it to the database
      await user.save();
    }

    const accountSid = process.env.accountSid;
    const authToken = process.env.authToken;

    const client = new twilio(accountSid, authToken);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationToken = verificationToken;
    await user.save();

    // Send SMS
    client.messages
      .create({
        body: `${user.verificationToken}`,
        to: `+91${number}`,
        from: "+14843460368",
      })
      .then((message) => console.log("Message sent with SID: " + message.sid))
      .catch((error) => console.error("Error sending message: ", error));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//LOGING IN ACCOUNT
export const login = async (req, res) => {
  try {
    //Check if already logged in
    if (req.session.userId) {
      return res.status(200).json({ error: "You are already logged in." });
    }

    //Request payload
    const { number, password, displayName } = req.body;

    if (!number || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    //Search for the user and gets the details
    let user = await User.findOne({ number, displayName });

    if (!user) {
      user = new User({
        displayName,
        number,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
      });

      //Saving it to the database
      await user.save();
    }

    //If incorrect return 400 error
    if (password !== user.verificationToken) {
      return res.status(400).json({ error: "Incorrect username or password" });
    }

    //If email is not verifed Delete Account

    if (
      user.verificationToken &&
      user.verificationTokenExpiresAt &&
      user.verificationTokenExpiresAt < Date.now()
    ) {
      await User.deleteOne({ _id: user._id });
      user.save();
      return res.status(400).json({
        error: "You failed to verify your number account has been deleted",
      });
    } else if (user.verificationTokenExpiresAt) {
      user.verificationTokenExpiresAt = undefined;
      user.save();
    }

    //Create a session
    req.session.userId = user._id;

    //If success return 200 okk
    res.status(200).json({ result: "Logged in", roles: user.role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Logout of account
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("AuthCookie");
    res.json({ result: "Logout successful" });
  });
};
