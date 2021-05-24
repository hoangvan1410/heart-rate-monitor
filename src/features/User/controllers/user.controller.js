const jwt = require("../../Config/security/jwt");
const User = require("../models/User");
const Account = require("../models/Account");
const UserRepository = require("../repository/user.repository");
const AccountRepository = require("../repository/account.repository");
const e = require("express");

module.exports.signup = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phoneNumber;

    let account = await AccountRepository.findAccountByEmail(email);
    if (account === null) {
        let user = new User({
            name: "",
            email: email,
            address: "",
            phoneNumber: "",
        });
        await UserRepository.createUser(user);

        let userId = await UserRepository.getUserIdByEmail(email);
        let otpCode = parseInt(Math.random()*8999 + 1000);
        let account = new Account({
            email: email,
            password: password,
            userId: userId,
            otpCode: otpCode.toString(),
            isActive: false
        });
        await AccountRepository.createAccount(account);
        await AccountRepository.sendOTP2Mail(email,otpCode);

        res.send({
            data: null,
            error_code: 2,
            message: "signup success but need verify OTP",
            status: 200,
        });
    } else {
        res.send({
            data: null,
            error_code: 0,
            message: "Account has exist, please sign in",
            status: 400,
        });
    }
};

module.exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let account = await AccountRepository.findAccountByEmail(email)
    if (account === null) {
        res.send({
            data: null,
            error_code: 0,
            message: "account not exist",
            status: 400,
        });
    } else {
        if (account.isActive === false) {
            res.send({
                data: null,
                error_code: 2,
                message: "Account has not been activated",
                status: 400,
            });
        }
        else{
            let checkPassword = await AccountRepository.findAccount(email, password);
            if (checkPassword === null){
                res.send({
                    data: null,
                    error_code: 0,
                    message: "Incorrect password",
                    status: 400,
                })
            }
            else{
                let user = await UserRepository.getUserByEmail(email);
                res.send({
                    data: {
                        user: user,
                        token: jwt.createToken(user._id),
                    },
                    error_code: 1,
                    message: "login success",
                    status: 200,
                });
            }
        }
        
        
    }
};

module.exports.otp = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let otpCode = req.body.otpCode;

    let account = await AccountRepository.findAccountByEmail(email)

    if(account === null){
        res.send({
            data: null,
            error_code: 0,
            message: "account not exist",
            status: 400,
        });
    }
    else{
        let acc = await AccountRepository.findAccount(email, password);
        if (acc === null){
            res.send({
                data: null,
                error_code: 0,
                message: "Incorrect password",
                status: 400,
            });
        }
        else{
            if(otpCode == acc.otpCode){
                await AccountRepository.active(email)
                let user = await UserRepository.getUserByEmail(email);
                res.send({
                    data: {
                        user: user,
                        token: jwt.createToken(user._id),
                    },
                    error_code: 1,
                    message: "signup success",
                    status: 200,
                });
            }
            else{
                res.send({
                    data: null,
                    error_code: 3,
                    message: "Incorrect OTPCode",
                    status: 200,
                });
            }
            
        }

    }
    
};

module.exports.resendOTP = async (req, res) => {
    let email = req.body.email;

    let account = await AccountRepository.findAccountByEmail(email)

    if(account === null){
        res.send({
            data: null,
            error_code: 0,
            message: "account not exist",
            status: 400,
        });
    }
    else{
        let isSend = await AccountRepository.sendOTP2Mail(email,account.otpCode)
        if (isSend == true){
            res.send({
                data: null,
                error_code: 0,
                message: "Send OTP Success",
                status: 200,
            });
        }
        else{
            res.send({
                data: null,
                error_code: 0,
                message: "Send OTP failed",
                status: 400,
            });
        }
    }
    
};