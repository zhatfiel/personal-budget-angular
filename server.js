const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', function(req, res) {
    console.log("read file, turned to string, parsed to JSON");
    var json = JSON.parse(fs.readFileSync('./budgetData.json').toString());
    res.json(json);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port);
});