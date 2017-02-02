//server.js

//BASE SETUP
// =============================================================================================================================

var express = require('express')
var app = express()
process.env.NODE_ENV = app.get('env') //set node env
var environment = require('./config/environment')  // get our config file

//Configure app to user bodyParse()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.api+json' }))
app.use(bodyParser.json({ type: 'application/*+json' }))

// app.use(bodyParser.raw({ type: 'text/html' }))

//Allow server side request
var cors = require('cors')
app.use(cors());

var swaggerSetup = require('./config/swagger-setup')
swaggerSetup.setupSwagger(app, express)

app.set('superSecret', environment.secret)  // secret variable

var jwtHelper = require('./lib/jwthelper')
app.use(function (req, res, next) {

  var isUserPostRoute = ((req.path.indexOf('users') > -1 && req.method === 'POST') || req.path.indexOf('auth') > -1)

  var appMainToken = req.headers['main-token']

  if (appMainToken == 'ZRCNAamAQ$yTv6&2VQ4eR*f?437w[FkF/gktDTg6#GunNQuE8@#]MC9B3NBTxifH') {
    if (!isUserPostRoute) {
      jwtHelper.verifyJsonWebToken(req, res, next, app)
    } else {
      next()
    }
  } else {

    res.status(403).send({"error":"unauthorized"})
  }



})

//Format debug log 
var morgan = require('morgan')
app.use(morgan('dev'))

var routesSetup = require('./config/routes')
routesSetup.setupRoutesAndVersions(app)


module.exports = app

//Service setup
var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Now is running on port' + port)
})
