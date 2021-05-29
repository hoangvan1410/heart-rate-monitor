const mongoose = require("mongoose");

const healthInfoSchema = new mongoose.Schema(
    {
        userId: String,
        height: Number,
        weight: Number,
        age: Number,
        gender: String,
        createDate: Date
    },
    { timestamps: true }
);

module.exports = mongoose.model("healthInfo", healthInfoSchema);
