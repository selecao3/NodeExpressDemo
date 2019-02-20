const mc = require('../Repository/MongoConnect');

exports.findByQuestions = function(itemName, page) {
  const query = mc.formedModel.find({questions: itemName}).sort({date: -1});
  const res = mc.formedModel.paginate(query, {page: page, limit: 5});
  return res;
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
          specialText: data.specialText
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
  // stuffでその他を選択してpostした場合、['その他','（任意の値）']で渡されるので0番目をここで弾く

  if (body.stuff[0] == 'その他') {
    body.stuff = body.stuff[1];
  }
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
  console.log(model);
  return model.save();
};

exports.searchByBody = function(body, page) {
  const searchTarget = {
    // date: body.date,
    date: new RegExp(body.date),
    stuff: body.stuff,
    ident: body.ident,
    questioner: new RegExp(body.questioner),
    questionersNumber: body.questionersNumber,
    questionersID: body.questionersID,
    checkFin: body.checkFin
  };
  for (key in searchTarget) {
    if (searchTarget[key] == '') {
      delete searchTarget[key];
    }
  }
  console.log(searchTarget);
  const query = mc.formedModel.find(searchTarget).sort({date: -1});
  const res = mc.formedModel.paginate(query, {page: page, limit: 5});
  return res;
};