// models/data.js
import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String, required: false }, // Optional image field
  combinedHash: { type: String },           // For storing hash
  encryptedData: { type: String },          // For storing encrypted combined data (text + image)
  decryptedText: { type: String },          // Temporarily store decrypted text
  decryptedImage: { type: Buffer },         // Temporarily store decrypted image
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
