import mongoose from 'mongoose';
import Data from './models/Data.js';
import { encryptText, decryptText, encryptImage, decryptImage } from './encryption.js';
import { hashData } from './hashing.js';
import { saveDataToDB } from './updateMongo.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to encrypt and store data
export async function encryptData() {
  try {
    const dataRecords = await Data.find();

    for (const record of dataRecords) {
      if (record.text) {
        // Encrypt text and image
        const encryptedText = encryptText(record.text);
        const encryptedImage = record.image ? encryptImage(Buffer.from(record.image, 'utf-8')) : null;

        // Generate hash for encrypted data
        const combinedEncryptedData = encryptedText + (encryptedImage || '');
        const combinedHash = await hashData(combinedEncryptedData);

        // Save encrypted data and hash to MongoDB
        await saveDataToDB(record._id, {
          combinedHash,
          encryptedData: combinedEncryptedData,
          decryptedText: null,
          decryptedImage: null,
        });

        console.log(`Encrypted and hashed data saved for record ${record._id}`);
      } else {
        console.log(`No text data to encrypt for record ${record._id}`);
      }
    }
  } catch (err) {
    console.error('Error during encryption:', err);
  }
}

// Function to decrypt and update data
export async function decryptData() {
  try {
    const dataRecords = await Data.find();

    for (const record of dataRecords) {
      if (record.encryptedData) {
        const encryptedText = record.encryptedData.slice(0, record.encryptedData.length - (record.image ? record.image.length : 0));
        const encryptedImage = record.image ? record.encryptedData.slice(-record.image.length) : null;

        // Decrypt text and image
        const decryptedText = decryptText(encryptedText);
        const decryptedImage = encryptedImage ? decryptImage(encryptedImage) : null;

        // Update MongoDB with decrypted values
        await saveDataToDB(record._id, {
          decryptedText,
          decryptedImage,
        });

        console.log(`Decrypted text for record ${record._id}:`, decryptedText);
        console.log(`Decrypted image for record ${record._id}:`, decryptedImage);
      } else {
        console.log(`No encrypted data to decrypt for record ${record._id}`);
      }
    }
  } catch (err) {
    console.error('Error during decryption:', err);
  }
}
