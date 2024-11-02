import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

// Schema
const abcSchema = new Schema({
        datetime: {type: Date, required: true},
        staff_name: { type: String, required: true },
        setting: { type: String, required: true },
        antecedent: { type: String, required: true },
        behavior: { type: String, required: true },
        consequence: { type: String, required: true },
        notes: { type: String },
        images: { type: Image }
      });
      
      // `UserModel` will have `name: string`, etc.
      module.exports = mongoose.model('abc', abcSchema);
