var http = require('http');
const PORT = process.env.PORT || 3000;

//Ici nous configurons express pour utiliser body-parser en tant que middle-ware.

var server = http.createServer(function(req, res) {
res.writeHead(200);
res.end('Salut tout le monde !');
});

server.listen(PORT,function(){
  console.log("Started on PORT 3000");
})