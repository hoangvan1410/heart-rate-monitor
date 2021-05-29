const Rate = require("../models/Rate");
const RateRepository = require("../repository/rate.repository");
const response = require("../../Config/responsive/handle");

module.exports.index = async (req, res) => {
    const heartRateNumber = req.body.heartRateNumber;
    const label = req.body.label;
    const createDate = new Date(req.body.createDate);
    const userId = req.user;
    const rate = new Rate({
        heartRateNumber: heartRateNumber,
        label: label,
        createDate: createDate,
        userId: userId,
    });
    RateRepository.addRate(rate);
    res.send(response.handleSuccess(rate, "Post rate success"));
};

module.exports.postArr = async (req, res) => {
    const rates = req.body.grapValues;
    const userId = req.user;
    const arrRates = [];
    if (rates === undefined) {
        res.send(response.handleError("Data is null"));
    } else {
        rates.forEach((rate) => {
            const heartRateNumber = rate.heartRateNumber;
            const label = rate.label;
            const createDate = new Date(rate.createDate);
            const newRate = new Rate({
                heartRateNumber: heartRateNumber,
                label: label,
                createDate: createDate,
                userId: userId,
            });
            arrRates.push(newRate);
            RateRepository.addRate(newRate);
        });
    }
    res.send(response.handleSuccess(arrRates, "Post array rate success"));
};

module.exports.getRates = async (req, res) => {
    const userId = req.user;
    const limitDay = req.query.limitDay;
    const rates = await RateRepository.getRates(userId, limitDay);
    res.send(response.handleSuccess(rates, "Get rate success"));
};
