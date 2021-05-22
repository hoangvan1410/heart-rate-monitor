const jwt = require("../../Config/security/jwt");
const User = require("../models/User");
const Account = require("../models/Account");
const UserRepository = require("../repository/user.repository");
const AccountRepository = require("../repository/account.repository");

module.exports.signup = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let account = await AccountRepository.findAccountByEmail(email);
    if (account === null) {
        let user = new User({
            email: email,
            password: password,
            address: "",
            phoneNumber: "",
        });
        await UserRepository.createUser(user);

        let userId = await UserRepository.getUserIdByEmail(email);
        let account = new Account({
            email: email,
            password: password,
            userId: userId,
        });
        await AccountRepository.createAccount(account);

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
};

module.exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let account = await AccountRepository.findAccount(email, password);
    if (account === null) {
        res.send({
            data: null,
            error_code: 0,
            message: "account not exist",
            status: 400,
        });
    } else {
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
};
