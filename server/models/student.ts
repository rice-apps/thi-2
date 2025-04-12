import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;



//slight edits to the schema based on the frontend design:

const studentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    abc_reports: { type: Number, default: 0 },            // optional but default to 0
    duration_reports: { type: Number, default: 0 }        // optional but default to 0
    // tier: {type: Number, required: true},              //get rid of this tier option
});  // maybe later: timestamps: true -> a createdAt

module.exports = mongoose.model('Student', studentSchema);
