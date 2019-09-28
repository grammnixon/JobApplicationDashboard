var http = require('http');
let jsonData = require('./data.json');

var server = http.createServer(function(req,res){
  console.log('request was made: ' + req.url);
  res.writeHead(200, {'Content-Type': 'application/json',
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
  res.end(JSON.stringify(jsonData));
});

const port = 3000;
server.listen(port);
console.log("listening on port: " + port);
