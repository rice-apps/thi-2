import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Account", accountSchema);
