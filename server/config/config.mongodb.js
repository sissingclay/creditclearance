const dbUrl = `mongodb://localhost:27017/credit`
const state = {
  db: null
}

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

exports.connect = (done) => {
  if (state.db) return done()

  mongoose.connect(dbUrl, (err, db) => {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.get = () => {
  return state.db
}

exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
