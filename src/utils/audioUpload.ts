import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'audio');

export async function uploadAudio(file: File) {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (!file) {
      throw new Error('No file uploaded');
    }

    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Unsupported audio type');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const maxSize = 20 * 1024 * 1024; // 20 MB max
    if (buffer.length > maxSize) {
      throw new Error('File size exceeds 20 MB');
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.promises.writeFile(filePath, buffer);

    return {
      success: true,
      path: `audio/${fileName}`, // you can store this in DB if needed
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Audio upload failed',
    };
  }
}
