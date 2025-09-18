import type { Document } from 'mongoose';

import mongoose, { model, Schema } from 'mongoose';

interface contactus extends Document {
  firstname: string;
  lastname: string;
  message: string;
  email: string;
}

const contactusSchema = new Schema<contactus>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  message: { type: String, required: true },
  email: { type: String, required: true },
});

// ✅ Correct way: use mongoose.models
const contactusModel =
  (mongoose.models.contactus as mongoose.Model<contactus>) ||
  model<contactus>('contactus', contactusSchema);

export default contactusModel;
