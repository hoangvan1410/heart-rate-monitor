
const HealthInfo = require("../models/HealthInfo");
const healthInfoRepository = require("../repository/healthInfo.repository");

module.exports.getHealthInfo = async (req, res) => {
 
    let healthinfo = await healthInfoRepository.getHealthInfo(req.user)
    res.send({
        data: healthinfo,
        error_code: 0,
        message: "get HealthInfo success",
        status: 200,
    });
    
};

module.exports.updateHealthInfo = async (req, res) => {
    let {height, age, weight,gender,createDate} = req.body;

    let healthinfo = await healthInfoRepository.getHealthInfo(req.user)
    let info = new HealthInfo({
        userId : req.user,
        height,
        weight,
        age,
        gender,
        createDate
    });

    if (healthinfo === null){
        await healthInfoRepository.createHealthInfo(info)
        res.send({
            data: info,
            error_code: 0,
            message: "update HealthInfo success",
            status: 200,
        });
    }
    else{
        await healthInfoRepository.updateHealthInfo(info)
        res.send({
            data: info,
            error_code: 0,
            message: "update HealthInfo success",
            status: 200,
        });
    }
        
    
    
};