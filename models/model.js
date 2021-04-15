var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String},
  email: { type: String, unique: true },
  family: {
    father: {type: String},
    mother: String
  },
  favorites: [String]
})

userSchema.index({ favorites: 1})

module.exports = mongoose.model('User', userSchema);















var addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  pin: String
});

addressSchema.index({state: 1, city: 1})

module.exports = mongoose.model('Address', addressSchema);





















var articleSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  author: String
});

articleSchema.index({title: "text"})

module.exports = mongoose.model('Article', articleSchema);



















