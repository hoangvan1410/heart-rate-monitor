const Rate = require("../models/Rate");
const jwt = require("../../Config/security/jwt");
const RateRepository = require("../repository/rate.repository");

module.exports.index = async (req, res) => {
    const heartRateNumber = req.body.heartRatNumber;
    const label = req.body.label;
    const createDate = req.body.createDate;
    const userId = jwt.decodeToken(req.body.token);

    const rate = new Rate(heartRateNumber, label, createDate, userId);
    RateRepository.addRate(rate);
};

module.exports.postArr = async (req, res) => {
    const rates = req.body.grapValues;
    const userId = jwt.decodeToken(req.body.token);
    rates.forEach((rate) => {
        const heartRateNumber = rate.heartRateNumber;
        const label = req.label;
        const createDate = req.createDate;
        const rate = new Rate(heartRateNumber, label, createDate, userId);
        RateRepository.addRate(rate);
    });
};  
