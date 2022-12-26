import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountId: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
    unique: true,
  },
  bankLogo: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
