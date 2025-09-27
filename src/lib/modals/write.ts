import type mongoose from 'mongoose';
import type { Document } from 'mongoose';

import { model, Schema, models } from 'mongoose';

interface Article extends Document {
  title: string;
  subtitle?: string;
  authors: string[]; // multiple authors possible
  publishedAt?: Date;
  body: string; // HTML content
  images?: string[]; // inline or banner images
  tags?: string[]; // categories or tags like ["Writing & Reporting"]
}

const articleSchema: Schema<Article> = new Schema<Article>({
  title: { type: String, required: true },
  subtitle: { type: String },
  authors: [{ type: String, required: true }],
  publishedAt: { type: Date, default: Date.now },
  body: { type: String, required: true }, // store HTML <p>...</p>
  images: [{ type: String }],
  tags: [{ type: String }],
});

const ArticleModel =
  (models.Article as mongoose.Model<Article>) || model<Article>('Article', articleSchema);

export default ArticleModel;
