const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const uri = 'mongodb://localhost/formedDB';
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect error:'));
// todo: mongooseのオプションでselect文

db.once('open', function() {
  const formedData = new Schema({
    date: String,
    stuff: String,
    ident: String,
    questioner: String,
    questionersNumber: String,
    questionersAddress: String,
    questionersID: String,
    questions: String,
    questionsCon: String,
    specialText: String,
    checkFin: String
  });
  formedData.plugin(mongoosePaginate);
  module.exports.formedModel = mongoose.model('FormedDB', formedData);
});
module.exports.db = db;
module.exports.Schema = Schema;
