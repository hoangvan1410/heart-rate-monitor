const HealthInfo = require("../models/HealthInfo");
const jwt = require("../../Config/security/jwt");
async function createHealthInfo(healthInfo) {
    try {
        await healthInfo.save();
    } catch (err) {
        console.log(err);
    }
}

async function getHealthInfo(id){
    return await HealthInfo.findOne({userId : id});
}

async function updateHealthInfo(newInfo){
    await HealthInfo.deleteOne({userId : newInfo.userId})
    return await createHealthInfo(newInfo)
}

module.exports = {
    createHealthInfo,
    getHealthInfo,
    updateHealthInfo
};
