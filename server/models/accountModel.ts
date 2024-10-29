import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    is_admin: Boolean,
    is_active: Boolean,
    is_deleted: Boolean,
    authorization_token: String
  });

module.exports = mongoose.model('Account', accountSchema);
  