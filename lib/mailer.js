var Config = require('../config/environment');
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("smtps://" + Config.email.username + ":" + Config.email.password + "@smtp.gmail.com");

exports.sentMailVerificationLink = function (user, token) {
    var textLink = Config.server.protocol + Config.server.host + "/" + Config.email.verifyEmailUrl + "/" + token
    var from = Config.email.accountName + " Team<" + Config.email.username + ">"
    var mailbody = "<p>Thanks for Registering on " + Config.email.accountName + " </p><p>Please verify your email by clicking on the verification link below.<br/><a href='" + textLink + "'>Verification Link</a></p>"
    mail(from, user.email, "Account Verification", mailbody)

}

exports.sentMailForgotPasswordLink = function (user, token) {
    var textLink = Config.server.protocol + Config.server.host + "/" + Config.email.forgotPasswordConfirmedUrl + "/" + token
    var from = Config.email.accountName + " Team<" + Config.email.username + ">"
    var mailbody = "<p>Click in the link below and a new password will be sent to your mail.<br/><a href='" + textLink + "'>Verification Link</a></p>"
    mail(from, user.email, "Retrieve Password", mailbody)

}

exports.sentNewCredentials = function (user, password) {
    // var textLink = Config.server.protocol+Config.server.host+"/"+Config.email.forgotPasswordConfirmedUrl+"/"+token
    var from = Config.email.accountName + " Team<" + Config.email.username + ">"
    var mailbody = "<p>Your " + Config.email.accountName + "  Account Credential</p><p>email : " + user.email + " , password : " + password + "</p>"
    mail(from, user.email, "New Password", mailbody)

}

exports.sentUserSignupInfo = function (userInfo) {
    // var textLink = Config.server.protocol+Config.server.host+"/"+Config.email.forgotPasswordConfirmedUrl+"/"+token
    var from = Config.email.accountName + " Team<" + Config.email.username + ">"    
    mail(from, Config.email.emailReceipt, "Novo usuário no 55lab.co", userInfo)
}

function mail(from, email, subject, mailbody) {

        var csv = require('to-csv');

    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        attachments: [
        {   
        filename: 'novo-' + mailbody.memberType +'.csv',
        content: csv(mailbody) 
        }]
        //text: result.price, // plaintext body
        // html: mailbody  // html body
    }

    smtpTransport.sendMail(mailOptions, function (error) {
        if (error) {
            console.error(error)
        }
        smtpTransport.close();
    })
}
