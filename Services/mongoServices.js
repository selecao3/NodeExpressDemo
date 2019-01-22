const mc = require('../Repository/MongoConnect');

exports.findByQuestions = function(itemName) {
  const result = mc.formedModel.find({ questions: itemName }).exec();
  return result;
};

exports.findById = function(id) {
  const result = mc.formedModel.findOne({ id: id }).exec();
  return result;
};

exports.findForLatestDates = function(title) {
  const result = [];
  let tmp;
  title.forEach(ele=> {
    tmp = mc.formedModel.findOne({ questions : ele}).sort({'date': -1}).exec();
    result.push(tmp);
  });
  return result;
};

exports.savesForQuestionerData = function(res, body) {
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
  return model.save();
};
