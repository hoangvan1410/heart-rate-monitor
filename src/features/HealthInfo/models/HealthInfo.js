const mongoose = require("mongoose");

const healthInfoSchema = new mongoose.Schema(
    {
        userId: String,
        height: String,
        weight: String,
        age: String,
        gender: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("healthInfo", healthInfoSchema);
