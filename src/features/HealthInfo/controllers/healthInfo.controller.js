const jwt = require("../../Config/security/jwt");
const HealthInfo = require("../models/HealthInfo");
const healthInfoRepository = require("../repository/healthInfo.repository");
const UserRepository = require("../../User/repository/user.repository");

module.exports.getHealthInfo = async (req, res) => {
    let token = req.body.token;
    let uid = await jwt.decodeToken(token)
    if (uid._id === undefined) {
        res.send({
            data: null,
            error_code: 1,
            message: "invalid token",
            status: 200,
        });
    }
    else{
        let healthinfo = await healthInfoRepository.getHealthInfo(uid._id)
        res.send({
            data: healthinfo,
            error_code: 0,
            message: "get HealthInfo success",
            status: 200,
        });
    }
    
};

module.exports.updateHealthInfo = async (req, res) => {
    let token = req.body.token;
    let height = req.body.height;
    let age = req.body.age;
    let weight = req.body.weight;
    let gender = req.body.gender;
    let uid = await jwt.decodeToken(token)
    if (uid._id === undefined) {
        res.send({
            data: null,
            error_code: 1,
            message: "invalid token",
            status: 200,
        });
    }
    else{
        let healthinfo = await healthInfoRepository.getHealthInfo(uid._id)
        let info = new HealthInfo({
            userId : uid._id,
            height: height,
            weight: weight,
            age: age,
            gender: gender,
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
        
    }
    
};