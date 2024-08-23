import express from "express";
import { configDotenv } from "dotenv";
import authRoute from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";

configDotenv();
const app = express();

app.use(express.json({ limit: "1KB" }));
app.use(cookieParser());

app.use(
  session({
    name: "AuthCookie",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION" ? true : false, // Set to true if using HTTPS
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
    },
  })
);

app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
