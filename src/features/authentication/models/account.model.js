const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: string,
    email: string,
    password: string,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
