console.log('initialisation server js');

// acces a tout l'univers de express - qui est dans node_modules
const express = require('express');
const app = express();
//console.log('express:',express);

/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/

app.use(function (req, res, next) {
    console.log('url',req.url);
    next();
  });
  
app.use(express.static('.'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
