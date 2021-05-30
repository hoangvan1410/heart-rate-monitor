const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
    {
        grapValues: Array,
        heartRateNumber: Number,
        label: String,
        createDate: Date,
        userId: String,
        isSubmitted: Boolean,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Rate", rateSchema);
