var http = require('http');
var fs = require('fs');
var path = require('path');

// Make a Server
var server = http.createServer();

// Listen for Requests
server.on('request', function (req, res){

  // Get info about requests
  var filename = path.basename(req.url);
  var method = req.method;
  if (filename === "") {
    res.end('BAD HUMAN, NO BISCUIT!');
    return;
  }

  // THIS IS NOT A GOOD idea ON HOW TO DATABASE SYSTEMS
  if (method.toLowerCase() ===  'post') {
    // Extract the data from a request
    getHTTPBody(req, function(err, theBody) {
      // console.log(url, theBody);
      fs.writeFile('./' + filename + '.txt', theBody);
      res.end();
    });
  } else if (method.toLocaleLowerCase() === 'get') {
    res.end('put file content here');
  }




});

// Start the server and list on port 3000 (eg. http://localhost:3000/)
server.listen(3000);

// Working below here

function getHTTPBody(request, callback) {
  var theData = [];
  request.on('data', function(chunkData) {
    theData.push(chunkData);
  }).on('end', function() {
    callback(undefined, Buffer.concat(theData).toString());
  });
}
