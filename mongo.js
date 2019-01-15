var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uri = 'mongodb://localhost/formedDB';
mongoose.connect(uri,{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect error:'))
// todo: mongooseのオプションでselect文
db.once('open', function () {
    var FormedData = new Schema({
        date: String,
        stuff: String,
        ident:String,
        questioner: String,
        questionersNumber: String,
        questionersAddress: String,
        questionersID: String,
        questions: String,
        questionsCon: String,
        specialText: String,
        checkFin: String,
    });
module.exports.FormedModel = mongoose.model('FormedDB', FormedData);


})
