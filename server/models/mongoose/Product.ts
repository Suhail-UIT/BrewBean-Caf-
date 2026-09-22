import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDoc extends Document {
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Breakfast' | 'Pizza' | 'Pasta' | 'Burgers' | 'Desserts';
  image: string;
  ingredients: string[];
  vegetarian: boolean;
  available: boolean;
  popular: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Coffee', 'Breakfast', 'Pizza', 'Pasta', 'Burgers', 'Desserts'],
    },
    image: { type: String, required: true },
    ingredients: { type: [String], default: [] },
    vegetarian: { type: Boolean, default: true },
    available: { type: Boolean, default: true },
    popular: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret._id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const ProductModel = mongoose.models.Product || mongoose.model<IProductDoc>('Product', ProductSchema);
