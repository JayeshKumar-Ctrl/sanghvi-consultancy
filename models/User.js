import mongoose from "mongoose";

const UserSchema =
  new mongoose.Schema({

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    company: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    
    resetOtp: {
      type: String,
    },

    resetOtpExpiry: {
      type: Date,
    },

    // PREMIUM ACCESS

    isPaid: {
      type: Boolean,
      default: false,
    },

    planType: {
      type: String,
      default: "Free",
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

  });

export default
mongoose.models.User ||
mongoose.model(
  "User",
  UserSchema
);