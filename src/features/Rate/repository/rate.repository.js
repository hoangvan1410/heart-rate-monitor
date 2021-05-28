const Rate = require("../models/Rate");

async function addRate(rate) {
    try {
        await rate.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addRate,
};
