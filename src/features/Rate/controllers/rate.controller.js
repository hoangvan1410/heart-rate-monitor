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
    // rates.forEach(async (rate) => {
    //     const heartRateNumber = rate.heartRateNumber;
    //     const label = rate.label;
    //     const createDate = new Date(rate.createDate);
    //     const newRate = new Rate({
    //         heartRateNumber: heartRateNumber,
    //         label: label,
    //         createDate: createDate,
    //         userId: userId,
    //     });
    //     arrRates.push(newRate);
    //     await RateRepository.addRate(newRate);
    // });
    for (let i = 0; i < rates.length; i++) {
        const heartRateNumber = rates[i].heartRateNumber;
        const label = rates[i].label;
        const createDate = new Date(rates[i].createDate);
        const newRate = new Rate({
            heartRateNumber: heartRateNumber,
            label: label,
            createDate: createDate,
            userId: userId,
        });
        arrRates.push(newRate);
        await RateRepository.addRate(newRate);
    }
    res.send(response.handleSuccess(arrRates, "Post array rate success"));
};

module.exports.getRates = async (req, res) => {
    const userId = req.user;
    const limitDay = req.query.limitDay;
    const rates = await RateRepository.getRates(userId, limitDay);
    res.send(response.handleSuccess(rates, "Get rate success"));
};
