import Data from './models/Data.js'; // Use import instead of require

async function saveDataToDB(id, { combinedHash, encryptedData, decryptedText, decryptedImage }) {
  try {
    const update = {
      ...(combinedHash && { combinedHash }),
      ...(encryptedData && { encryptedData }),
      ...(decryptedText && { decryptedText }),
      ...(decryptedImage && { decryptedImage }),
    };

    const updatedRecord = await Data.findByIdAndUpdate(id, update, { new: true });
    console.log(`Database updated for record ${id}`);
    return updatedRecord;
  } catch (err) {
    console.error(`Database update error for record ${id}:`, err);
  }
}

export { saveDataToDB };
