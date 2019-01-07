var express = require('express')
var pdfdocument = require('pdfkit')
var ejs = require('ejs')
const path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs');
var node = require('nodemailer')

var app = express()
var doc = new pdfdocument();

const PORT = process.env.PORT || 5000
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use('/static', express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static('public'));
var hello ;
var variable;
// création de repertoire et zippage du repertoire
const folderName = './server'
const zipFolder = require('zip-a-folder')


app.post('/', function (req, res) {
  //res.send(req.body)	
  //console.log(process.cwd())
    res.setHeader('Content-Type', 'application/json');
 //console.log(fs.exists(path.join(process.cwd(),'rudystephane.pdf')))
	/*fs.exists(path.join(process.cwd(),'rudystephane.pdf'), function (exists) {
  		console.log(exists ? "it's there" : 'no passwd!');
	});*/
	const testFolder = process.cwd();
	fs.readdir(testFolder, (err, files) => {
	  files.forEach(file => {
	    console.log(file);
	  });
	})
 console.log('valeur recupérée : '+req.body.file)
 res.send(JSON.stringify({ a: req.body.file}));
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

/*
	module de generation de fichier pdf
	
	doc.pipe(fs.createWriteStream('test.pdf'));
	/*doc.title = 'CrĂ©ation de compte' ;
	doc.subject = 'BGFIBANK' ;
	doc.text('nom	: rudy');
	doc.text('prenom	: stephane');
	doc.text('cni	: 111TEST');
	//doc.image('logo.png', 0, 0, 0)

	doc.end();

	var modsendmail = require('./modsendmail');
	var attachfile = [
			{
				name : 'test.pdf',
				path : '/app/test.pdf'
			}
		];
	modsendmail.fcsendmail('stephane.tekam@netinafrica.com','tekamfossi@gmail.com','envoie de mail' , 'nouveau webhook d\'envoie de mail', attachfile );


*/
