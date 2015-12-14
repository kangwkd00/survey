var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  timestamp: {type: Date, default: Date.now},
  items: [String]
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

//required true는 무조건 내용필요 트림은 공백을 지우고 저장해줘
//id에 대한 내용이없으면 저절로 생성_id

var Answer = mongoose.model('Answer', schema);

module.exports = Answer;
