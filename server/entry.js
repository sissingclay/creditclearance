/**
 * Resources
 * https://www.terlici.com/2015/04/03/mongodb-node-express.html
 * https://mlab.com/databases/credit/collections/reports?pageSize=10&pageNum=0&q=&s=&f=
 * https://zellwk.com/blog/crud-express-mongodb/
 * https://zellwk.com/blog/crud-express-and-mongodb-2/
 */
const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const hostname = '127.0.0.1'
const db = require('./config/config.mongodb')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())

// set our port
const port = process.env.PORT || 8080

const router = express.Router()

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router
  .get('/', (req, res) => {
    db.get().collection('reports').find().toArray((err, result) => {
      res.json({reports: result})
    })
  })

router
  .post('/reports', (req, res) => {
    db.get().collection('reports').save(req.body, (err, result) => {
      if (err) return console.log('err', err)
      res.json(result)
      // res.redirect('/')
    })
  })
  .put((req, res) => {
    
    res.json({message: 'You see me rolling, Put!'})
  })

app.use('/api', router)

db.connect((err) => {
  if (err) {
    process.exit(1)
  } else {
    app.listen(port)
    console.log(`Magic happens on port ${port}`)
  }
})
