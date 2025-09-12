import type mongoose from 'mongoose';
import type { Document } from 'mongoose';

import { model, Schema, models } from 'mongoose';

interface photoSchema extends Document {
  heading: string;
  content: string;
  image?: string;
}

const Photoschema: Schema<photoSchema> = new Schema({
  heading: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
});

const photoModel =
  (models.photo as mongoose.Model<photoSchema>) || model<photoSchema>('photo', Photoschema);

export default photoModel;
