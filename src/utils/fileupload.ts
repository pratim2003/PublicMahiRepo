import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'upload');

export async function uploadImage(file: File) {
  try {
    // Ensure folder exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (!file) {
      throw new Error('No file uploaded');
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Unsupported file type');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const maxSize = 5 * 1024 * 1024;
    if (buffer.length > maxSize) {
      throw new Error('File size exceeds 5 MB');
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.promises.writeFile(filePath, buffer);

    return {
      success: true,
      message: 'Image uploaded successfully',
      path: `upload/${fileName}`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Image upload failed',
    };
  }
}
