var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true, trim: true},
  password:{type:String},
  email: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  content: {type: String, required: true, trim: true},
  read:{type:Number,default:0}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

//required true는 무조건 내용필요 트림은 공백을 지우고 저장해줘
//id에 대한 내용이없으면 저절로 생성_id

var Survey = mongoose.model('Survey', schema);

module.exports = Survey;
