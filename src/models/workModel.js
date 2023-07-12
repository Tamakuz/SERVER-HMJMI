import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [8, "Panjang title minimal 8 karakter"],
    maxlength: [100, "Panjang title maksimal 100 karakter"],
    required: [true, "Title tidak boleh kosong"],
  },
  desc: {
    type: String,
    minlength: [8, "Panjang deskripsi minimal 8 karakter"],
    maxlength: [300, "Panjang deskripsi maksimal 100 karakter"],
    required: [true, "Deskripsi tidak boleh kosong"],
  },
  link: {
    type: String,
    required: [true, "Link tidak boleh kosong"],
  },
  thumbnail: {
    type: String,
  },
  delete_url: {
    type: String,
  },
  detailcollage: {
    type: ObjectId,
    ref: "Collage",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model("Work", workSchema);
