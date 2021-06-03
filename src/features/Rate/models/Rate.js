const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
    {
        grapValues: Array,
        heartRateNumber: Number,
        label: String,
        createDate: Number,
        userId: String,
        isSubmitted: Boolean,
        local_id: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Rate", rateSchema);
