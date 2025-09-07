// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
      // LinkedIn OIDC integration
  linkedinSub: { type: String },        // unique OIDC ID (sub)
  linkedinAccessToken: { type: String },
  linkedinName: { type: String },       // full name from id_token
  linkedinEmail: { type: String },      // email from id_token
  linkedinPicture: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
