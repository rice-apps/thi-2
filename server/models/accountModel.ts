import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    is_admin: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    authorization_token: { type: String, default: null }
  });

module.exports = mongoose.model('Account', accountSchema);
  