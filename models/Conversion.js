import mongoose from "mongoose";

const ConversionSchema =
  new mongoose.Schema(

    {

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

      },

      fileName: {
        type: String,
      },

      originalFileUrl: {
        type: String,
      },

      convertedExcelUrl: {
        type: String,
        default: "",
      },

      language: {
        type: String,
      },

      status: {

        type: String,

        default:
          "Processing",

      },

    },

    {
      timestamps: true,
    }

  );

export default
  mongoose.models.Conversion ||

  mongoose.model(
    "Conversion",
    ConversionSchema
  );