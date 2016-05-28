var fs = require('fs');
var express = require('express');
var app = express();

var manifest = [];
var books = JSON.parse(fs.readFileSync('kjv.manifest'));
for (var i = 0; i < books.length; ++i) {
    manifest.push(books[i]);
}

app.get('/', function(req, res) {
      res.send('Hello World!');
});

app.get('/books', function(req, res) {
    var rv = [];
    for (var i = 0; i < manifest.length; ++i) {
        rv.push(manifest[i].name);
    }
    res.json({ "items": rv });
});

app.get('/book/:name', function(req, res, next) {
    for (var i = 0; i < manifest.length; ++i) {
        if (manifest[i].name == req.params.name) {
            res.json({ "chapters": manifest[i].chapters });
            return;
        }
    }
    next();
});

app.listen(3000);

