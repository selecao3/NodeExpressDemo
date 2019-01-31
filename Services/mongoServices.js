const mc = require('../Repository/MongoConnect');
const paginate = require('express-paginate');

exports.findByQuestions = function(itemName) {
  const result = mc.formedModel.find({questions: itemName});
  const res = mc.formedModel.paginate(result, {page: 1, limit: 1});
  return res;
};

exports.paginateTest = function() {
  console.log('pagination start');
  mc.formedModel.paginate({}, {page: 1, limit: 5}, function(err, result) {
    console.log(result);
  })
  console.log('pagination fin');
};

exports.findById = function(id) {
  const result = mc.formedModel.findOne({_id: id}).exec();
  return result;
};

exports.findForLatestDates = function(title) {
  const result = [];
  let tmp;
  title.forEach(ele => {
    tmp = mc.formedModel.findOne({questions: ele}).sort({date: -1}).exec();
    result.push(tmp);
  });
  return result;
};

exports.FinCheck2True = function(itemID) {
  console.log(itemID);
  // idではなく、_id
  mc.formedModel.updateOne(
      {_id: itemID}, {$set: {checkFin: '1'}}, {upsert: false}, function(err) {
        if (err) {
          console.log(err);
        }
      });
};

exports.deleteByID = function(itemID) {
  mc.formedModel.deleteOne({_id: itemID}, function(err) {
    if (err) {
      console.log('error');
      return false;
    }
  });
  return true;
};

exports.updateOneDataByBody = function(data, id) {
  // idではなく、_id
  console.log(data.questionsCon);
  mc.formedModel.updateOne(
      {_id: id}, {
        $set: {
          stuff: data.stuff,
          ident: data.ident,
          questioner: data.questioner,
          questionersNumber: data.questionersNumber,
          questionersAddress: data.questionersAddress,
          questionersID: data.questionersID,
          questions: data.questions,
          questionsCon: data.questionsCon,
          specialText: data.specialText,
        }
      },
      {upsert: false}, function(err) {
        if (err) {
          console.log(err);
          return false;
        }
      });
  return true;
};



exports.savesForQuestionerData = function(body) {
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
