var express = require('express')
var router = express.Router()
var Environment = require('../../../config/environment')
var Jwt = require('jsonwebtoken')
var Mailer = require('../../../lib/mailer')
var errorHelper = require('../../../lib/error-handler')
var objectSerializer = require('../../../lib/object-serializer')
// var models = require('../models/index');


router.route('/users')

  
  /**
   * @swagger
   * /api/v0/users:
   *   post:
   *     tags:
   *       - Users
   *     description: Create new user
   *     parameters:
  *       - name: name
  *         description: user valid email
  *         in: formData
  *         required: true
  *         type: string
  *       - name: cpf
  *         description: user valid cpf
  *         in: formData
  *         required: true
  *         type: string
  *       - name: rg
  *         description: user valid rg
  *         in: formData
  *         required: true
  *         type: string
  *       - name: adress_label 
  *         description: user valid adress label
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  adress_number
  *         description: user valid adress number
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  adress_complement
  *         description: user valid adress complement
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  adress_neighbor
  *         description: user valid adress complement
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  adress_state
  *         description: user valid adress state
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  adress_country
  *         description: user valid adress country
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  email
  *         description: valid email
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  telephone 
  *         description: valid telephone
  *         in: formData
  *         required: true
  *         type: string
  *       - name:  memberType 
  *         description: valida membership type
  *         in: formData
  *         required: true
  *         type: string
   *     responses:
   *       200:
   *         description: Email sent
   *       403:
   *         description: Email not sent try again
   */
  .post(function (req, res) {

    var deserializedUser = null

    objectSerializer.deserializeJSONAPIDataIntoObject(req.body).then(function (deserialized) {

      deserializedUser = deserialized
       Mailer.sentUserSignupInfo(deserializedUser)

       return res.status(200).json({"Sent": 202})

    }).catch(function (err) {

      var error = objectSerializer.serializeSimpleErrorIntoJSONAPI(JSON.stringify(err))
      return res.status(403).json(error)
    })

  })


module.exports = router
