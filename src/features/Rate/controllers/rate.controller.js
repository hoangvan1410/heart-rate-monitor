const Rate = require("../models/Rate");
const RateRepository = require("../repository/rate.repository");
const response = require("../../Config/responsive/handle");

module.exports.index = async (req, res) => {
    const grapValues = req.body.grapValues;
    const heartRateNumber = req.body.heartRateNumber;
    const label = req.body.label;
    const createDate = +req.body.createDate;
    const userId = req.user;
    const local_id = req.body.local_id;
    const rate = new Rate({
        grapValues: grapValues,
        heartRateNumber: heartRateNumber,
        label: label,
        createDate: createDate,
        userId: userId,
        isSubmitted: true,
        local_id: local_id,
    });
    RateRepository.addRate(rate);
    res.send(response.handleSuccess(rate, "Post rate success"));
};

module.exports.postArr = async (req, res) => {
    const rates = req.body.rates;
    const userId = req.user;
    const arrRates = [];
    if (rates === undefined) {
        res.send(response.handleError("Data is null"));
    } else {
        rates.forEach((rate) => {
            const grapValues = rate.grapValues;
            const heartRateNumber = rate.heartRateNumber;
            const label = rate.label;
            const createDate = +rate.createDate;
            const local_id = rate.local_id;
            const newRate = new Rate({
                grapValues: grapValues,
                heartRateNumber: heartRateNumber,
                label: label,
                createDate: createDate,
                userId: userId,
                isSubmitted: true,
                local_id: local_id,
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
