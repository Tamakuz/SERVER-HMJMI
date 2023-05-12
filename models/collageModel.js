import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { ObjectId } = mongoose.Schema;

const collageSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: [5, "Panjang email minimal 5 karakter"],
    maxlength: [50, "Panjang email maksimal 50 karakter"],
    lowercase: true,
    index: true,
    required: [true, "Email tidak boleh kosong"],
    validate: {
      validator: (email) => {
        // regex untuk validasi email
        return /^[a-zA-Z0-9._%+-]+@gmail.com$/.test(email);
      },
      message: "Format email tidak valid",
    },
  },
  password: {
    type: String,
    minlength: [8, "Panjang password minimal 8 karakter"],
    maxlength: [100, "Panjang password maksimal 100 karakter"],
    required: [true, "Password tidak boleh kosong"],
  },
  username: {
    type: String,
    index: true,
    minlength: [5, "Panjang username minimal 5 karakter"],
    maxlength: [75, "Panjang username maksimal 75 karakter"],
    required: [true, "Username tidak boleh kosong"],
  },
  role: {
    type: String,
    default: "Mahasiswa",
  },
  status: {
    type: String,
    enum: {
      values: ["Aktif", "Alumni"],
      message: "Status hanya boleh diisi dengan Aktif atau Alumni",
    },
    required: [true, "Status tidak boleh kosong"],
  },
  refresh_token: {
    type: String,
    lowercase: true,
  },
  detailuser: {
    fullname: {
      type: String,
      minlength: [5, "Panjang Fullname minimal 5 karakter"],
      maxlength: [100, "Panjang Fullname maksimal 100 karakter"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Laki - Laki", "Perempuan"],
        message: "Gender hanya boleh diisi dengan Laki - Laki atau Perempuan",
      },
    },
    thumbnail: {
      type: String,
    },
  },
  workcollage: [
    {
      type: ObjectId,
      ref: "Work",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

collageSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("Collage", collageSchema);
