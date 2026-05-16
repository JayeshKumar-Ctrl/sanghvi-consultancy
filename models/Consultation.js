import mongoose from "mongoose";

const ConsultationSchema =
  new mongoose.Schema(
    {

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      service: {
        type: String,
        required: true,
      },

      message: {
        type: String,
      },

      status: {
        type: String,

        default: "Pending",
      },

      paymentStatus: {
        type: String,

        default: "Unpaid",
      },

      createdAt: {
        type: Date,

        default: Date.now,
      },

    }
  );

export default
  mongoose.models.Consultation ||

  mongoose.model(
    "Consultation",
    ConsultationSchema
  );