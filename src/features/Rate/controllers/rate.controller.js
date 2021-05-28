const Rate = require("../models/Rate");
const jwt = require("../../Config/security/jwt");
const RateRepository = require("../repository/rate.repository");

module.exports.index = async (req, res) => {
    const heartRateNumber = req.body.heartRatNumber;
    const label = req.body.label;
    const createDate = Date.now();
    const userId = "";
    const rate = new Rate({
        heartRateNumber: heartRateNumber,
        label: label,
        createDate: createDate,
        userId: userId,
    });
    RateRepository.addRate(rate);
};

module.exports.postArr = async (req, res) => {
    const rates = req.body.grapValues;
    const userId = "";
    rates.forEach((rate) => {
        const heartRateNumber = rate.heartRateNumber;
        const label = rate.label;
        const createDate = rate.createDate;
        const newRate = new Rate({
            heartRateNumber: heartRateNumber,
            label: label,
            createDate: createDate,
            userId: userId,
        });
        RateRepository.addRate(newRate);
    });
};
