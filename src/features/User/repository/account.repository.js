const Account = require("../models/Account");

async function createAccount(account) {
    try {
        await account.save();
    } catch (err) {
        console.log(err);
    }
}

async function findAccount(email, password) {
    return await Account.findOne({ email: email, password: password });
}

async function findAccountByEmail(email) {
    return await Account.findOne({ email: email });
}

module.exports = {
    createAccount,
    findAccountByEmail,
    findAccount,
};
