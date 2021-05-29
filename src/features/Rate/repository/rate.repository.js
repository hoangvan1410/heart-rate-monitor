const Rate = require("../models/Rate");

async function addRate(rate) {
    try {
        await rate.save();
    } catch (err) {
        console.log(err);
    }
}

async function getRates(userId, limitDay) {
    let rates = [];
    try {
        rates = await Rate.find({
            userId: userId,
            createDate: { $gt: getDate(limitDay), $lt: Date.now() },
        });
    } catch (err) {
        console.log(err);
    }

    return rates;
}

function getDate(limitDate) {
    return new Date(
        new Date().getTime() - limitDate * 24 * 60 * 60 * 1000
    ).toLocaleString();
}

module.exports = {
    addRate,
    getRates,
};
