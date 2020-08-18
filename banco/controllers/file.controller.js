var FileModel = require('../model/file.model');
const mongoose = require('mongoose');
var  mongodb = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/db_imagem';

exports.test = function (req, res) {
    res.send('Olá! Teste ao Controller');
};

//Adicionar file à BD
// método como POST e no Body escolham x-www-form-urlencoded
exports.create = function (req, res) {
    let file = new FileModel(
     {
        b64data: req.body.b64data,
        mimetype: req.body.mimetype,
        filename: req.body.filename
     }
     );

     // Salvar
     file.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Registo File Criado com Sucesso!');
     })
};

// Pesquisa os Dados
exports.details = function(req, res){
    FileModel
        .findById(req.params.id)
        .exec(function (err, files) {
            if (err) return handleError(err);
            // returns all files.
            //console.log(res.json(files));
            res.json(files)
    }); 
};

// Lista os Dados
exports.list = function(req, res){
    FileModel
        .find({})
        .exec(function (err, files) {
            if (err) return handleError(err);
            // returns all files.
            //console.log(res.json(files));
            res.json(files)
    });    
};