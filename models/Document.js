import mongoose from
"mongoose";

const documentSchema =
  new mongoose.Schema(

    {

      userId: {
        type: String,
      },

      uploadedBy: {
        type: String,
      },

      userEmail: {
        type: String,
      },

      fileName: {
        type: String,
      },

      fileUrl: {
        type: String,
      },

      status: {

        type: String,

        default:
          "Uploaded",

      },

      category: {

        type: String,

        default:
          "Document",

      },

    },

    {
      timestamps: true,
    }

  );

export default
mongoose.models.Document ||

mongoose.model(
  "Document",
  documentSchema
);