/**
 * Resources
 * https://www.terlici.com/2015/04/03/mongodb-node-express.html
 * https://mlab.com/databases/credit/collections/reports?pageSize=10&pageNum=0&q=&s=&f=
 * https://zellwk.com/blog/crud-express-mongodb/
 * https://zellwk.com/blog/crud-express-and-mongodb-2/
 * https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 * https://nodesource.com/blog/nine-fantastic-utilities-for-the-node-js-developer?utm_source=nodeweekly&utm_medium=email
 */
const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const db = require('./config/config.mongodb')
const stormpath = require('express-stormpath')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())
app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: '3331XMM8BL1NFHLZL2RRRUCAH',
      secret: 'E8hP2LBwMS2SfQa2HxYVYlQQfwM1C4Fw7+AhTTyXeGc'
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/2HTSDY7xj26rwX3enfOHpx'
  },
  web: {
    produces: ['application/json'],
    login: {
      enabled: true,
      uri: '/api/login'
    },
    logout: {
      enabled: true,
      uri: '/api/logout'
    }
  }
}))

// set our port
const port = process.env.PORT || 8080
const router = express.Router()
require('./routes/route.entry')(router, stormpath)

app.use('/api', router)

app.on('stormpath.ready', function () {
  db.connect((err) => {
    if (err) {
      process.exit(1)
    } else {
      app.listen(port)
      console.log(`Magic happens on port ${port}`)
    }
  })
})
