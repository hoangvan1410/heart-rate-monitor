const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
    {
        heartRateNumber: Number,
        label: String,
        createDate: Date,
        userId: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Rate", rateSchema);
