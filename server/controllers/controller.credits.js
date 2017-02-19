const error = require('../config/config.error').error
const Credit = require('../models/model.credit')

exports.get = (req, res) => {
  Credit.find({}, (err, result) => {
    if (err) error('Get records', err)
    res.json(result)
  })
}

exports.post = (req, res) => {
  var record = Credit(req.body)
  record.save((err, result) => {
    if (err) error('Create record', err, res)
    res.json(result)
  })
}
