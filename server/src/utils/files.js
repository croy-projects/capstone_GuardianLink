const fs = require("fs/promises");
const path = require("path");

async function deleteFile(fileName) {

    if (!fileName) return;

    const filePath = path.join(__dirname, "..", "..", process.env.UPLOAD_DIR, fileName);

    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.error("Delete failed:", err);
    }

}

module.exports = {
    deleteFile
};