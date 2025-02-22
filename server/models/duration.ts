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
      }
});

module.exports = mongoose.model('Duration', durationSchema);