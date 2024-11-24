// encryption.js
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'utf-8');
const iv = Buffer.from(process.env.IV, 'utf-8');

// Encrypt function for text
function encryptText(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

// Decrypt function for text
function decryptText(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Encrypt function for images (Buffer to Base64)
function encryptImage(imageBuffer) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(imageBuffer);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('base64');
}

// Decrypt function for images (Base64 to Buffer)
function decryptImage(encryptedImage) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const encryptedBuffer = Buffer.from(encryptedImage, 'base64');
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
}

export { encryptText, decryptText, encryptImage, decryptImage };
