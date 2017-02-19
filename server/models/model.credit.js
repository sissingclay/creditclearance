// grab the things we need
const mongoose = require('mongoose')
require('mongoose-type-email')
const Schema = mongoose.Schema

// create a schema
var creditSchema = new Schema({
  name: String,
  last_name: String,
  identity_number: { type: Number, max: 13 },
  email: [{ type: mongoose.SchemaTypes.Email }],
  agent: {
    id: String,
    name: String
  },
  status: String,
  created_at: Date,
  updated_at: Date
})

// on every save, add the date
creditSchema.pre('save', (next) => {
  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate
  }

  next()
})

// the schema is useless so far
// we need to create a model using it
var Credit = mongoose.model('Credit', creditSchema)

// make this available to our users in our Node applications
module.exports = Credit
