import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  _id?: string;
  name: string;
  image: string;
  original_price: number;
  discount_price: number;
  quantity: number;
  category: string;
}

export interface ICart extends Document {
  items: ICartItem[];
}

const CartItemSchema: Schema = new Schema<ICartItem>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  original_price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true }
}, { _id: true });

const CartSchema: Schema = new Schema<ICart>({
  items: { type: [CartItemSchema], default: [] }
}, { timestamps: true });

const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;