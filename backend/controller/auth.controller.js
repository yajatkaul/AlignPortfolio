import User from "../models/user.model.js";
import twilio from "twilio";

//CREATING AN ACCOUNT FROM HERE
export const signup = async (req, res) => {
  try {
    const { displayName, number, password, type, location } = req.body;

    //Function to check if all the details are inputted correctly
    const result = await signupChecks({
      displayName,
      number,
      type,
      location,
    });

    //If details are not correct then sends a error response
    if (result !== true) {
      return res.status(400).json({ error: result.error });
    }

    //Generate random token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //If it is able to pass every check create a new user
    const newUser = new User({
      displayName,
      number,
      type,
      location,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
    });

    //Saving it to the database
    await newUser.save();

    //req.session.userId = newUser._id;

    //Account has been created response
    res.status(200).json({ result: `Success` });
  } catch (err) {
    //Incase there is an error
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getOTP = async (req, res) => {
  try {
    const { number: number } = req.params;
    const user = await User.findOne({ number });
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

//Function to check the details if they are correct or not
async function signupChecks({ displayName, number, type, location }) {
  const emailCheck = await User.findOne({ number });

  if (emailCheck) {
    return { error: "Email is already in use" };
  }

  if (!displayName || !number || !type || !location) {
    return { error: "Please fill all fields" };
  }

  if (displayName.length < 5) {
    return { error: "Names should be greater than 4 letters" };
  }

  if (!isValidEmail(number)) {
    return { error: "Invalid number format" };
  }

  return true;
}

//Check if its a valid email
function isValidEmail(number) {
  if (Number(number)) {
    return true;
  }
  return false;
}

//LOGING IN ACCOUNT
export const login = async (req, res) => {
  //Check if already logged in
  if (req.session.userId) {
    return res.status(200).json({ error: "You are already logged in." });
  }

  //Request payload
  const { number, password } = req.body;

  if (!number || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  //Search for the user and gets the details
  const user = await User.findOne({ number });

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
  res.status(200).json({ result: "Logged in" });
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
