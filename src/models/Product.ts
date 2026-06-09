import { Schema, model, models } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  images: string[];
  tags: string[];
  featured: boolean;
  rating: number;
  reviews: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>({
  name:          { type: String, required: true },
  description:   { type: String, default: '' },
  price:         { type: Number, required: true },
  originalPrice: Number,
  category:      { type: String, default: 'General' },
  stock:         { type: Number, default: 0 },
  images:        [String],
  tags:          [String],
  featured:      { type: Boolean, default: false },
  rating:        { type: Number, default: 0 },
  reviews:       { type: Number, default: 0 },
}, { timestamps: true });

const Product = models.Product ?? model<IProduct>('Product', ProductSchema);
export default Product;
