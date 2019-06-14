console.log('initialisation server js');

// acces a tout l'univers de express - qui est dans node_modules
//const express = require('express');   // notation de node
import * as express from 'express';     // notation de type ou es6
//const serveIndex = require('serve-index');    //notation de node
import * as serveIndex from 'serve-index';       // notation de type ou es6
import * as cors from 'cors';
import * as fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/

app.use(
  function (req, res, next) {
    console.log('this', this);
    console.log('url', req.url);
    next();
  });
// = aux "arrow fonction" :
/* app.use( (req, res, next) => {
  console.log('url', req.url);
  next();
}); */

let quizz;
// methode post & url egale a /wz/quizz
app.post('/ws/quizz', (req, res, next) => {
  console.log('sync the quizz list', req.body);
  quizz = req.body;
  fs.writeFileSync('./quizz.json', JSON.stringify(quizz));
  res.json({
    message: 'sync ok'
  });
});

app.get('/ws/quizz', (req, res, next) => {
  console.log('get the quizz list');
  quizz = JSON.parse(fs.readFileSync('./quizz.json', 'utf8'));
  res.json(quizz);
});

const dir: string = '.';

app.use(express.static(dir));               //permet d'afficher le contenu des fichiers
app.use(serveIndex(dir, { icons: true }));    // permet de naviguer dans le répertoire

const port = 3000;
app.listen(port, function () {
  console.log('Server prod started on port: ' + port);
});

