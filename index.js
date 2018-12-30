var express = require('express')
var pdf = require('pdfkit')
var ejs = require('ejs')

var app = express()

const PORT = process.env.PORT || 5000
 
/*app.get('/', function (req, res) {
  res.send(req.body)
 
 console.log('test de la console')
})*/
 
app.post('/', function (req, res) {
  //res.send(req.body)
 console.log(JSON.parse(req.body))
 res.end("yes")
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


/*const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/
