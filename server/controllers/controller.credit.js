const error = require('../config/config.error').error
const Credit = require('../models/model.credit')

exports.get = (req, res) => {
  Credit.findById(req.params.id, (err, result) => {
    if (err) error('Get records', err)
    res.json(result)
  })
}

exports.put = (req, res) => {
  Credit.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) error('Finding record to update', err)
    res.json(result)
  })
}

exports.delete = (req, res) => {
  Credit.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) error('Create record', err, res)
    res.json(result)
  })
}
