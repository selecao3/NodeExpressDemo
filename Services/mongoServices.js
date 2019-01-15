const mc = require('../Repository/MongoConnect');

// exports.findByQuestions = function (itemName) {
//   console.log(itemName);
//   result01 = mc.formedModel.find({ questions: itemName }, function (err, result) {
//     if (err) throw err;
//     console.log(result[0]);
//   })
//   console.log(result01[0]);
//   return result01;
// };
exports.findByQuestions = function (itemName) {
  const result = mc.formedModel.find({ questions: itemName }).exec();
  return result
};

exports.findById = function (id) {
  const result = mc.formedModel.findOne({ id: id }).exec();
  return result;
};

exports.savesForQuestionerData = function (res, body) {
  const model = new mc.formedModel({
    date: body.date,
    stuff: body.stuff,
    ident: body.ident,
    questioner: body.questioner,
    questionersNumber: body.questionersNumber,
    questionersAddress: body.questionersAddress,
    questionersID: body.questionersID,
    questions: body.questions,
    questionsCon: body.questionsCon,
    specialText: body.specialText,
    checkFin: body.checkFin
  });
  model.save(function (err) {
    if (err) {
      res.send(err);
      return 1;
    }
  });
  return 0;
}