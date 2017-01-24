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

        var string =  " \
    <table style=\"height: 272px;\" width=\"342\"> \
    <tbody> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Nome</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" + userInfo.name  + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">CPF</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" + userInfo.cpf + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\"> RG </td> \
    <td style=\"width: 163.015625px; height: 20px;\">" + userInfo.rg + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Endere&ccedil;o</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" +  userInfo.adressNumber  + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">N&uacute;mero de endere&ccedil;o</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" +  userInfo.adressNeighbor  + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Complemento</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" +  userInfo.adressState  + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Bairro</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" +  userInfo.adressCountry  + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Estado</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" + userInfo.adressState + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Pa&iacute;s</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" +  userInfo.adressCountry + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Email</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" + userInfo.email + "</td> \
    </tr> \
    <tr style=\"height: 20px;\"> \
    <td style=\"width: 163px; height: 20px;\">Telefone</td> \
    <td style=\"width: 163.015625px; height: 20px;\">" + userInfo.telephone + "</td> \
    </tr> \
    </tbody> \
    </table> \
    \
    "
    mail(from, Config.email.emailReceipt, "Novo usuário no 55lab.co", string)
}

function mail(from, email, subject, mailbody) {
    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        //text: result.price, // plaintext body
        html: mailbody  // html body
    }

    smtpTransport.sendMail(mailOptions, function (error) {
        if (error) {
            console.error(error)
        }
        smtpTransport.close();
    })
}
