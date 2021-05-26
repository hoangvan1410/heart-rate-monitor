const Account = require("../models/Account");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var bcrypt = require('bcryptjs');
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

async function updateOTP(email, otpCode) {
    return await Account.updateOne({ email: email },{otpCode: otpCode});
}

async function updatePassword(email, password) {
    await Account.updateOne({ email: email},{$unset : { otpCode : ""}})
    return await Account.updateOne({ email: email },{password: password});
}

async function active(email) {
    await Account.updateOne({ email: email},{$unset : { otpCode : ""}})
    return await Account.updateOne({ email: email},{ isActive: true });
}

async function sendOTP2Mail(email,otpCode){

    const oauth2Client = new OAuth2(
        "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
        "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
    });
    const accessToken = oauth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId: "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken
        },
    });

    const output = `
    <h1>Đây là mã OTP của bạn, vui lòng nhập nó vào màn hình OTP trên ứng dụng</h1>
    <h2>${otpCode}</h2>
    `;

    const mailOptions = {
        from: '"Auth Admin" <heartratemonitor@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Account Verification: Heart Rate Monitor OTP", 
        generateTextFromHTML: true,
        html: output, 
    };

    transporter.sendMail(mailOptions,(error, info) => {
        if(error) {
            console.log(error)
        }
        else{
            console.log(info)
        }
    })
}

async function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

async function comparePassword(password,hash){
    return bcrypt.compareSync(password,hash)
}
module.exports = {
    createAccount,
    findAccountByEmail,
    findAccount,
    active,
    sendOTP2Mail,
    updateOTP,
    updatePassword,
    hashPassword,
    comparePassword
};
