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
    return new Date().getTime() - limitDate * 24 * 60 * 60 * 1000;
}

async function deleteRateByLocalId(local_id) {
    await Rate.deleteOne({ local_id: local_id });
}

async function updateLabel(id, newLabel) {
    const rate = await Rate.findById(id).exec();
    if (rate === null) {
        return "update fail";
    } else {
        await Rate.findOneAndUpdate(
            { _id: id },
            { label: newLabel },
            function (err, result) {
                if (err) {
                    return "update fail";
                } else {
                    return "update success";
                }
            }
        );
    }
}

module.exports = {
    addRate,
    getRates,
    deleteRateByLocalId,
    updateLabel,
};
