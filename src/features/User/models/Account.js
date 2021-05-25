const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        userId: String,
        email: String,
        password: String,
        isActive: Boolean,
        otpCode: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
