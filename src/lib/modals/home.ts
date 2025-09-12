import type mongoose from 'mongoose';
import type { Document } from 'mongoose';

import { model, Schema, models } from 'mongoose';

interface home extends Document {
  heading: string;
  body: string;
  image?: string;
}

const homeShema: Schema<home> = new Schema<home>({
  heading: { type: String, required: true },
  body: { type: String, required: true },
  image: String,
});

const homeModel = (models.home as mongoose.Model<home>) || model<home>('home', homeShema);

export default homeModel;
