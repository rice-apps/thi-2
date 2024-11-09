import mongoose, { model } from 'mongoose';
const {Account} = require("../models");
const { Schema } = mongoose;

// Schema
const abcSchema = new Schema({
        staff: {type: mongoose.Types.ObjectId, required: true}, 
        student_id: {type: mongoose.Types.ObjectId, required: true}, 
        date: {type: Date, required: true}, // note: splitting into date and time will have to be done later since date contains both the date and time
        settings: {type: String, required: true}, 
        antecedent: {type: String, required: true}, 
        behavior: {type: String, required: true}, 
        consequence: {type: String, required: true}, 
        comments: {type: String, required: true}, 
});
      
module.exports = mongoose.model('abc', abcSchema);
