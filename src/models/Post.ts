import { Schema, model, models } from 'mongoose';

export interface IPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  tags: string[];
  coverImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema<IPost>({
  title:      { type: String, required: true },
  slug:       { type: String, required: true, unique: true },
  excerpt:    { type: String, default: '' },
  content:    { type: String, default: '' },
  author:     { type: String, default: 'Admin' },
  status:     { type: String, enum: ['draft', 'published'], default: 'draft' },
  tags:       [String],
  coverImage: String,
}, { timestamps: true });

const Post = models.Post ?? model<IPost>('Post', PostSchema);
export default Post;
