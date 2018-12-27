var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userData = new Schema({
    date: String,
    stuff: String,
    questioner: String,
    questionersNumber:String,
    questionerAddress:String,
    questionerID:String,
    questions:String,
    questionsCon:String,
    specialText:String,
    checkFin:String,

});

mongoose.model('userData', userData);
mongoose.connect('mongodb://localhost:27017/userData');
