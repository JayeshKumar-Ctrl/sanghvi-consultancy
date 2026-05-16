import mongoose from
"mongoose";

const UploadSchema =
  new mongoose.Schema({

    fileName: {
      type: String,
    },

    fileUrl: {
      type: String,
    },

    uploadedBy: {
      type: String,
    },

    userEmail: {
      type: String,
    },

    fileType: {
      type: String,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

  });

export default
mongoose.models.Upload ||

mongoose.model(
  "Upload",
  UploadSchema
);