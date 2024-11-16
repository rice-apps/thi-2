import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    tier: {type: Number, required: true}
});

module.exports=mongoose.model('Student', studentSchema);