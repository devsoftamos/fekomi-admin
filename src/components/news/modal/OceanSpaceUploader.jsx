const { S3 } = require("aws-sdk");

class OceanSpaceUploader {
  /**
   *
   * @param {{ oceanSpaceAccessKey: string, oceanSpaceSecretKey: string, oceanSpaceRegion: string, uploadEndpoint: string}} config
   */
  constructor(config) {
    console.log(config,"CONFIG");
    this.bucketName = config?.bucketName;
    this.s3 = new S3({
      accessKeyId: config?.oceanSpaceAccessKey,
      secretAccessKey: config?.oceanSpaceSecretKey,
      region: config?.oceanSpaceRegion,
      endpoint: config?.uploadEndpoint,
    });
  }

  buildKey(options) {
    return `${options.dir}/${options.name}.${options.format}`;
  }

  /**
   *
   * @param {{ directory: string, name: string, format: string, body: string}} options
   * @returns { Promise<string>}
   */
  async uploadFile(options) {
    const key = this.buildKey({
      directory: options.directory,
      name: options.name,
      format: options.format,
    });
      // Extracting 'body' from options
  const { body } = options;

  // Check if body exists before creating the buffer
  if (!body) {
    throw new Error('No body provided for upload.');
  }
    const bodyBuffer = Buffer.from(body, "base64");
    const params = {
      Bucket: this.bucketName,
      ContentEncoding: "base64",
      Key: key,
      Body: bodyBuffer,
    };

    const data = await this.s3.upload(params).promise();
    return data.Location;
  }
}

const p = new OceanSpaceUploader();
p.uploadFile({});

module.exports = OceanSpaceUploader;