const express = require('express');
const app = express();

const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"];
//console.log(usuarios);


app.use(express.json());
app.use(express.static(__dirname + '/public'));


//middleware para validación usuario
const validarUser = (req, res, next) => {
    const { usuario } = req.params;
    const index = usuarios.findIndex((item) => item === usuario);
    //console.log(index)
    if (index === -1) return res.redirect('/who');
    next();
};

//middleware para número conejo
const validarNum = (req, res, next) => {
    function numRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const numAleatorio = numRandom(1, 5);
    const { n } = req.params;
    console.log(n)
    console.log(numAleatorio)
    if (n != numAleatorio) return res.redirect('/voldemor')
    next();
}

app.get("/abracadabra/juego/:usuario", validarUser, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/abracadabra/conejo/:n', validarNum, (req, res) => {
    res.sendFile(__dirname + '/public/assets/conejito.jpg');
});

app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios })
});


app.get('/who', (req, res) => {
    res.sendFile(__dirname + '/public/assets/who.jpeg');
});

app.get('/voldemor', (req, res) => {
    res.sendFile(__dirname + '/public/assets/voldemort.jpg');
});


//Ruta no definida
app.get("*", (req, res) => {
    res.send("<h1>Esta página no existe</h1>")
});


app.listen(5000, () => {console.log('Servidor OK')});