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

const accountSchema = new mongoose.Schema<AccountDocument>({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  is_admin: { type: Boolean, default: false },
  is_active: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  authorization_token: { type: String, default: null },
});

//module.exports = mongoose.model<AccountDocument>("Account", accountSchema);
export const AccountModel = mongoose.model<AccountDocument>(
  "Account",
  accountSchema
);
