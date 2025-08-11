const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
