const jwt = require("jsonwebtoken");

function createToken(userId) {
    return jwt.sign({ _id: userId }, process.env.TOKEN_KEY);
}

function decodeToken(token) {
    return jwt.verify(token, process.env.TOKEN_KEY);
}

module.exports = {
    createToken,
    decodeToken
};
