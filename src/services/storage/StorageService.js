const { Storage } = require('@google-cloud/storage');
const path = require('path');

const credentialPath = path.join(__dirname, 'storage.json');

class StorageService {
  constructor(bucketName) {
    this._bucketName = bucketName;
    this._storage = new Storage({
      keyFilename: credentialPath,
      projectId: process.env.PROJECT_ID,
    });
    this._bucket = this._storage.bucket(bucketName);
  }

  async writeFile(file, meta) {
    const folderName = 'image';
    const filename = `${folderName}/${+new Date()}_${meta.filename}`;
    const fileBlob = this._bucket.file(filename);
    const stream = fileBlob.createWriteStream({
      resumable: false,
      contentType: meta.headers['content-type'],
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => reject(error));
      stream.on('finish', () => resolve(filename));
      file.pipe(stream);
    });
  }
}

module.exports = StorageService;
