const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FileSchema = new Schema({
    b64data: {type:String},
    mimetype: {type:String},
    filename: {type:String}
});

// Exportar o modelo
module.exports = mongoose.model('File', FileSchema);