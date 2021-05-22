const User = require("../models/User");

async function createUser(user) {
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
}

async function getUserByEmail(email) {
    return await User.findOne({ email: email });
}

async function getUserIdByEmail(email) {
    let user = await User.findOne({ email: email });
    return user._id;
}

module.exports = {
    createUser,
    getUserIdByEmail,
    getUserByEmail,
};
