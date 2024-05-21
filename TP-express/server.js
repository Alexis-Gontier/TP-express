const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use((req, res, next) => {
  console.log(`Requete reçue a ${Date.now()}`);
  next();
});

app.get('/about', (req, res) => {
  console.log('Envoie des infos');
  res.send('auteur : moi');
});

app.use('/about', (req, res) => {
  console.log('Abort');
  res.status(405).send('');
});

app.use((req, res, next) => {
  console.log(`Requete pour la route: ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('accueil');
});

app.get('/private', (req, res) => {
  res.send('Page privée');
});

app.get('/private/mine', (req, res) => {
  res.send('Page privée personnelle');
});

app.get('/pictures', (req, res) => {
  const file = path.join(__dirname, 'image.png');
  res.download(file);
});


const coursData = {
  '1': {
    titre: 'Cours 1',
    descriptif: 'descriptif',
    enseignants: ['Alexis', 'Arnaud', 'Max']
  },
  '2': {
    titre: 'Cours 2',
    descriptif: 'descriptif',
    enseignants: ['Louis', 'Mickael']
  }
};


app.get('/cours/:numeroducours/descr', (req, res) => {
  const numeroducours = req.params.numeroducours;
  const cours = coursData[numeroducours];

  if (cours) {
    res.render('cours', {
      titre: cours.titre,
      descriptif: cours.descriptif,
      enseignants: cours.enseignants
    });
  } else {
    res.status(404).send('Cours non trouvé');
  }
});










app.use((req, res) => {
  res.status(404).send('Page non trouvée');
});










app.listen(port, () => {
	console.log(`Notre application est démarrée sur : http://localhost:${port}`)
})