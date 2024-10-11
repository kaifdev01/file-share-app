import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filetype: { type: String, required: true },
  filepath: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
  userEmail: { type: String, required: true },  // Store the user's email
});

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File;

