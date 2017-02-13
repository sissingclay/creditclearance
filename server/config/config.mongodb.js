const dbUser = 'credit'
const dbPassword = 'credit007!'
const dbUrl = `mongodb://${dbUser}:${dbPassword}@ds023902.mlab.com:23902/credit`
const state = {
  db: null
}
const MongoClient = require('mongodb').MongoClient

exports.connect = (done) => {
  if (state.db) return done()

  MongoClient.connect(dbUrl, (err, db) => {
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
