const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: string,
    email: string,
    address: string,
    phoneNumber: string,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
