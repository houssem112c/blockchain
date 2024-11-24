import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Hash function for data
function hashData(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

export { hashData };
