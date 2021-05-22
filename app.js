const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// router
const userRoute = require("./src/features/User/routes/user.route.js");

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// connect db
mongoose.connect(
  process.env.URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log(`connect database success`)
);

// router
app.use("/api/users", userRoute);

// app listen
app.set("port", process.env.PORT || 5500);
app.listen(app.get("port"), () => {
  console.log(`server is running at port ${app.get("port")}`);
});
