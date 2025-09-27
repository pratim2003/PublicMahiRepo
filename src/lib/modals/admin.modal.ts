import type mongoose from 'mongoose';
import type { Document } from 'mongoose';

import { model, Schema, models } from 'mongoose';

interface admin extends Document {
  name: String;
  email: string;
  password: string;
  phone: string;
}

const adminSchema: Schema<admin> = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
});

const adminModel = (models.admin as mongoose.Model<admin>) || model<admin>('admin', adminSchema);

export default adminModel;
