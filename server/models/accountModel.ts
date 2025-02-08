import mongoose from "mongoose";

export interface AccountDocument extends Document {
  email: string;
  is_active: { type: Boolean; default: false };
  password: String;
  first_name: String;
  last_name: String;
  is_admin: { type: Boolean; default: false };
  is_deleted: { type: Boolean; default: false };
  authorization_token: { type: String; default: null };
}

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String }, // ⚠️ Ensure password is hashed before saving
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  is_admin: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  authorization_token: { type: String, default: "test" },
});

module.exports = mongoose.model("AccountModel", accountSchema);
// export const AccountModel = mongoose.model<AccountDocument>(
//   "Account",
//   accountSchema
// );

// const studentSchema = new Schema({
//     first_name: {type: String, required: true},
//     last_name: {type: String, required: true},
//     tier: {type: Number, required: true}
// });

// module.exports=mongoose.model('Student', studentSchema);
