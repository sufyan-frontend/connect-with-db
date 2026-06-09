import { Schema, model, models } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IOrder {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    phone:   String,
    address: { type: String, required: true },
    city:    { type: String, required: true },
    zip:     { type: String, required: true },
    country: { type: String, default: 'Pakistan' },
  },
  items:         [{ productId: String, name: String, price: Number, quantity: Number, image: String }],
  subtotal:      Number,
  shipping:      { type: Number, default: 0 },
  total:         Number,
  status:        { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  notes:         String,
}, { timestamps: true });

const Order = models.Order ?? model<IOrder>('Order', OrderSchema);
export default Order;
