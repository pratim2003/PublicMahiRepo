import crypto from 'crypto';

// AES Encryption function
export function encrypt(text: string, secretKey: string): string {
  const key = Buffer.from(secretKey, 'utf-8'); // Convert secretKey to a buffer
  const iv = Buffer.from(secretKey).slice(0, 16); // 16-byte IV

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// AES Decryption function
export function decrypt(encryptedText: string, secretKey: string): string {
  const key = Buffer.from(secretKey, 'utf-8');
  const iv = Buffer.from(secretKey).slice(0, 16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

// Generate secret key (32 chars long for AES-256)
export const secretKey: string = crypto
  .createHash('sha256')
  .update('DFRSEFGTHNJGFTHGFRIOPLMZAQWSCDERFVGGTdiusaidu')
  .digest('hex')
  .slice(0, 32);
