var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const objectSchema = new Schema({
    object: {
        type: String,
        required: true
    },
    datelost: {
        type: Date,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
        timestamps:true
});



module.exports = mongoose.model('Object', objectSchema);
