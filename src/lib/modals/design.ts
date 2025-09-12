import type { Model, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface DesignEntry extends Document {
  containt?: string;
  heading?: string;
  subHead1?: string;
  subHead2?: string;
  images?: string[];
}

const DesignSchema = new Schema<DesignEntry>(
  {
    containt: { type: String },
    heading: { type: String },
    subHead1: { type: String },
    subHead2: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true, collection: 'design' }
);

export const DesignModel: Model<DesignEntry> =
  mongoose.models.Design || mongoose.model<DesignEntry>('Design', DesignSchema);
