import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  age?: number;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age:   { type: Number },
}, { timestamps: true });

// Prevent model re-registration during hot-reload in development
const User = models.User ?? model<IUser>('User', UserSchema);

export default User;
