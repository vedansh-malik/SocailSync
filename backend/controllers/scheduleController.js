// import Schedule from '../models/ScheduleModel.js';

// export const createSchedule = async (req, res) => {
//   try {
//     const { userId, selectedDate, selectedTime, frequency } = req.body;

//     if (!userId || !selectedDate || !selectedTime || !frequency) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const newSchedule = new Schedule({ userId, selectedDate, selectedTime, frequency });
//     await newSchedule.save();

//     res.status(201).json({ message: 'Schedule created successfully.', schedule: newSchedule });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
