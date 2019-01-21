const mc = require('../Repository/MongoConnect');

exports.findByQuestions = function(itemName) {
  const result = mc.formedModel.find({ questions: itemName }).exec();
  return result;
};

exports.findById = function(id) {
  const result = mc.formedModel.findOne({ id: id }).exec();
  return result;
};

//TODO: title直書き->result（連想配列）へ格納-> return
exports.findForLatestDates = async function(title) {
  const result = [];
  const items = [];
  let tmp;
  title.forEach(ele=> {
    tmp = mc.formedModel.findOne({ questions : ele}).exec();
    result.push(tmp);
  });
  console.log(result);
  Promise.all(result).then(
    function(res) {
      items = res;
    },
    function(error) {
      console.log("error");
    }
  )
  //TODO: 非同期で返さないようにする。つまり、この関数でPromise.all.thenを行う。
  console.log("32ぎょうめ");
  console.log(items);
  return items;
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
