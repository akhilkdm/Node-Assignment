const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const projectsRoute = require('./routes/projects');
const adminRoute = require('./routes/admin')
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

const app = express();

//----------database Connection-----
mongoose.connect(process.env.MONGO_CONNECTION, () => {
  console.log("database connected");
});

//---------middlewares------
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());

app.use(
  session({
    secret: "foo",
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

//-----------Routes-----------
app.use("/api/user", userRoute);
app.use("/api/projects",projectsRoute);
app.use("/api/admin",adminRoute)

app.listen(5000, () => {
  console.log("server connected on port 5000");
});
