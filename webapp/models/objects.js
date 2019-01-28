var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var etatSchema = new Schema({
    trouver: {
        type: Boolean
    },
    en_recherche: {
        type: Boolean
    },
    inactive: {
        type: Boolean
    }
},
    {
        timestamps:true
});

const objectSchema = new Schema({
    objet: {
        type: String,
        required: true
    },
    date_perdu: {
        type: String,
        required: true
    },
    proprio:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    info: {
        type: String,
    },
    couleur: {
        type: String
    },
    etat: [etatSchema]
},{
        timestamps:true
});


var Object = mongoose.model('Object', objectSchema);
module.exports = Object;
