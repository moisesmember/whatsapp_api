const express = require('express');
const bodyParser = require('body-parser');
const fileRoute = require("./routes/file.routes");
const app = express(); // inicializar app express

//Acesso à BD
const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/db_imagem';
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,{useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na Ligação ao MongoDB'));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/file', fileRoute);

let port = 8000;
app.listen(port, () => {
    console.log('Servidor Node em Execução: ' + port);
});