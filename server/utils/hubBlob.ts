import { H3Event, createError, setResponseHeaders, sendStream } from 'h3';
import { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const { public: config } = useRuntimeConfig();

const s3 = new S3Client({
  region: 'auto',
  endpoint: config.r2.endpoint,
  credentials: {
    accessKeyId: config.r2.accessKey,
    secretAccessKey: config.r2.secretKey,
  },
});

export function useHubBlob() {
  const list = async ({ prefix, limit }: { prefix: string, limit: number }) => {
    const command = new ListObjectsV2Command({
      Bucket: config.r2.bucket,
      Prefix: prefix,
    });
  
    try {
      const response = await s3.send(command);
      const files = response.Contents?.map(obj => ({
        pathname: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
      })) ?? [];
  
      return files;
    } catch (err) {
      console.error('Failed to list objects:', err);
      return { error: 'Could not fetch blobs' };
    }
  };

  const serve = async (event: H3Event, key: string) => {
    const command = new GetObjectCommand({
      Bucket: config.r2.bucket,
      Key: key,
    });
    
    try {
      const response = await s3.send(command);
      const stream = response.Body as ReadableStream;
  
      setResponseHeaders(event, {
        'Content-Type': response.ContentType ?? 'application/octet-stream',
        'Content-Length': response.ContentLength?.toString() ?? '',
      });
  
      return sendStream(event, stream as any); // cast to satisfy types
    } catch (err) {
      console.error('Error serving blob:', err);
      throw createError({ statusCode: 404, message: 'Blob not found' });
    }
  };

  const del = async (key: string) => {
    const command = new DeleteObjectCommand({
      Bucket: config.r2.bucket,
      Key: key,
    });

    try {
      await s3.send(command);
  
      return { success: true, message: `Deleted ${key}` };
    } catch (err) {
      console.error('Error deleting blob:', err);
      throw createError({ statusCode: 500, message: 'Failed to delete blob' });
    }

  };

  const put = async (key: string, file: File, { addRandomSuffix, prefix }: { addRandomSuffix: boolean, prefix: string }) => {
    const command = new PutObjectCommand({
      Bucket: config.r2.bucket,
      Key: `${prefix}/${key}`,
      Body: file,
      ContentType: file.type,
    });

    try {
      await s3.send(command);
  
      return { success: true, message: `Uploaded ${key}`, pathname: `${prefix}/${key}` };
    } catch (err) {
      console.error('Error uploading blob:', err);
      throw createError({ statusCode: 500, message: 'Failed to upload blob' });
    }
  };

  const ensureBlob = (file: File, { maxSize, types }: { maxSize: string, types: string[] }) => {
    if (file.size > parseInt(maxSize)) {
      throw createError({ statusCode: 400, message: 'File too large' });
    }

    if (!types.includes(file.type)) {
      throw createError({ statusCode: 400, message: 'Invalid file type' });
    }
  };

  return {
    list, serve, put, del, ensureBlob
  }
}