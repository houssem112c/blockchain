import { encryptData, decryptData } from './processData.js';

// Start the encryption, hashing, and decryption process
const args = process.argv.slice(2); // Get command line arguments

if (args.includes('encrypt')) {
  encryptData();
} else if (args.includes('decrypt')) {
  decryptData();
} else {
  console.log('Please provide either "encrypt" or "decrypt" as an argument.');
}
