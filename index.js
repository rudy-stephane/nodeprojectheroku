var express = require('express')
var pdfdocument = require('pdfkit')
var ejs = require('ejs') 
const path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs');
var node = require('nodemailer')
var http = require('http');
var url = require("url");
//var zipFolder = require('zip-a-folder');
//var mkdirp = require('mkdirp');

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
//const folderName = './server'
const zipFolder = require('zip-a-folder')

//fonction permettant d'extraire un caractère dans une chaine
function remove_character(str, char_pos) 
 {
  var part1 = str.substring(0, char_pos);
  var part2 = str.substring(char_pos + 1, str.length);
  return (part1 + part2);
 }

// identification
var nom;
var numero;
var cni ;
var mail ;
var foldername ;

app.post('/webhook', function(req,res){
	nom = req.body.nom;
	numero = req.body.telephone;
	cni = req.body.cni;
	mail = req.body.mail;
	console.log(cni);
    	folderName = './'+ cni;
	try {
	      if (!fs.existsSync(folderName)){
	          fs.mkdirSync(folderName);
		  console.log(folderName);
	      }
	} catch (err) {
	  console.error(err);
	}
	try {
		var ws = fs.createWriteStream('./'+cni+'/'+nom+'.pdf');
		doc.pipe(ws);
		doc.title = 'CrĂ©ation de compte' ;
		doc.subject = 'BGFIBANK' ;
		doc.text('noms & prenoms : '+nom);
		doc.text('numero : '+numero);
		doc.text('cni : '+cni);
		doc.text('mail : '+mail);
		doc.end();
		ws = null ;
	} catch (err) {
	  console.error(err);
	}
	
	//const testFolder = __dirname;
	fs.readdir(folderName, (err, files) => {
	  files.forEach(file => {
	    console.log(file);
	  });
	})
res.send({reuslt : 'ok'});
})
var c = 0 ;
app.post('/', function (req, res) {
  if(req.body.rep == 'sendfile'){
	  console.log(req.body.rep+'  valeur cherchée');
	  console.log(req.body.rep+'  valeur cherchée');
	  c = c + 1 // indice de la piece envoyée
	
	//var file = fs.createWriteStream('./'+cni+'/piece'+c+'.gif');
	var fileup = req.body.fileurl;
	console.log(fileup.length);
	var debut = fileup.substring(0, 4);
	var fin = fileup.substring(5,fileup.length);
	var total = debut + fin;
	var parsed = url.parse(total);
	var filecreate = path.basename(parsed.pathname);
	var file = fs.createWriteStream('./'+cni+'/'+filecreate);
	console.log(total);
	 console.log('***********'+file+'************');
	var request = http.get(total, function(response) {
	  response.pipe(file);
		console.log(req.body.rep+'  valeur cherchée');
	});
	  res.send({result : 'ok'});
  }
 else if(req.body.rep == 'sendans')
 {
 	zipFolder.zipFolder('./'+cni, './'+cni+'.zip', function(err) {
           if(err) {
               console.log('Something went wrong!', err);
            }else{
		console.log('folder zip');
	    }
        });
	var modsendmail = require('./modsendmail');
	var attachfile = [
			{
				name : cni+'.zip',
				path : '/app/'+cni+'.zip'
			}
		];
	modsendmail.fcsendmail('stephane.tekam@netinafrica.com',mail,'dossier de création de compte' , 'votre dossier nous a été soumis', attachfile );
	res.sendFile('/app/'+cni+'/'+nom+'.pdf');	
 }
	//res.sendFile('/app/'+cni+'/'+nom+'.pdf')
	//res.send({result : 'ok'})
	//console.log(process.cwd())
    //res.setHeader('Content-Type', 'application/json');
 //console.log(fs.exists(path.join(process.cwd(),'rudystephane.pdf')))
	/*fs.exists(path.join(process.cwd(),'rudystephane.pdf'), function (exists) {
  		console.log(exists ? "it's there" : 'no passwd!');
	});*/
	/*const testFolder = __dirname;
	fs.readdir(testFolder, (err, files) => {
	  files.forEach(file => {
	    console.log(file);
	  });
	})
	fs.exists(path.join('/app/','server.zip'), function (exists) {
  		console.log(exists ? "it's there" : 'no passwd!');
	})
 console.log('valeur recupérée : '+req.body.file)
 res.send(JSON.stringify({ a: req.body.file}));
 res.end("yes")*/
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
