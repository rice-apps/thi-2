import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const durationSchema = new Schema({
      student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
      },
      
      date: {
        type: Date,
        required: true
      },
      time_started: {
        type: Date,
        required: true
      },
      time_ended: {
        type: Date, 
        required: true
      },
      time_total: {
        type: Number, // Assume that we will retrieve this using time_started - time_ended
        required: true
      },
      activity: {
        type: String,
        required: true
      },
      notes: {
        type: String,
        required: true
      },
      staff: {
        type: mongoose.Types.ObjectId, // Assume that we will retrieve this using the staff_id from the user
        required: true // This is the staff that assinged the duration
      },
    });

module.exports = mongoose.model('Duration', durationSchema);