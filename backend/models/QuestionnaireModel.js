const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  personal_intro: String,
  profession: String,
  content_focus: [String],
  hobbies: String,
  sports: [String],
  goals: String,
  audience: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
