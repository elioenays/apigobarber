import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import upload from '@config/upload';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPAth = path.resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPAth);
    await this.client
      .putObject({
        Bucket: upload.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPAth);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'app-gobarber-eli-teste',
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
