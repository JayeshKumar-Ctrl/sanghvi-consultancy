import mongoose from "mongoose";

const PaymentSchema =
  new mongoose.Schema({

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    fullName: {
      type: String,
    },

    email: {
      type: String,
    },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    razorpaySignature: {
      type: String,
    },

    amount: {
      type: Number,
    },

    currency: {
      type: String,
      default: "INR",
    },

    plan: {
      type: String,
      default: "Premium",
    },

    paymentStatus: {
      type: String,
      default: "Completed",
    },

    paidAt: {
      type: Date,
      default: Date.now,
    },

  });

export default
mongoose.models.Payment ||

mongoose.model(
  "Payment",
  PaymentSchema
);