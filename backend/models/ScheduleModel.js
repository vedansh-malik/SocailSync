// const mongoose = require('mongoose');

// const scheduleSchema = new mongoose.Schema({
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     selectedDate: {
//       type: Date,
//       required: true,
//     },
//     selectedTime: {
//       type: String,
//       required: true,
//     },
//     frequency: {
//       type: String,
//       enum: ['Daily', 'Alternate Days', 'Twice a Week', 'Weekly'],
//       required: true,
//     },
//   });
  
// export default mongoose.model("Schedule", scheduleSchema);  