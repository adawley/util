/*
    Requires 
*/
var express = require('express'),
    os = require('os');

/*
    Variables
*/
var app = express(),
    PORT = 8069,
    ifaces = os.networkInterfaces();

function show_if_detail(details, alias) {
    alias = alias || 0;
    if (details.family == 'IPv4') {
        console.log(dev + (alias ? ':' + alias : ''), details.address);
        ++alias;
    }
}

/*
    Configure the server
*/
app.configure(function() {

    var options = {
        maxAge: 1000 * 60 * 60
    };

    app.use(express.static(__dirname, options));
    app.use(express.directory(__dirname));
    app.use(express.errorHandler());
});

/*
    Start the server
*/
app.listen(PORT);

/*
    Output the listening interfaces and port.
*/
for (var dev in ifaces) {
    ifaces[dev].forEach(show_if_detail);
}

console.log('Server Listening on', PORT);