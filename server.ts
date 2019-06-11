console.log('initialisation server js');

// acces a tout l'univers de express - qui est dans node_modules
const express = require('express');
const serveIndex = require('serve-index');

const app = express();

/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/

app.use(function (req, res, next) {
    console.log('url', req.url);
    next();
});

const dir = "../ex1/dist/ex1";

app.use(express.static(dir));               //permet d'afficher le contenu des fichiers
app.use(serveIndex(dir, {icons: true}));    // permet de naviguer dans le répertoire

const port = 3000;
app.listen(port, function () {
    console.log('Server prod started on port: ' + port);
});

