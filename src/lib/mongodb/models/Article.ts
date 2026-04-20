import mongoose, { Schema, model, models } from 'mongoose';

export interface IArticle {
  title: string;
  slug: string;
  content: string;
  description: string;
  category: string;
  emoji: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    emoji: { type: String, default: '📝' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Article = models.Article || model<IArticle>('Article', ArticleSchema);

export default Article;
