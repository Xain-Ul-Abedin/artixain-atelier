import mongoose, { Schema, Document, Model } from 'mongoose';

export type OrderStatus = 'Placed' | 'Assembling' | 'QC Passed' | 'Shipped' | 'Delivered';

export interface IOrderItem {
  name: string;
  type: 'custom' | 'premade';
  token?: string;
  designToken?: string;
  wristSizeCm: number;
  cordType: string;
  beadCount: number;
  beadSummary: string;
  unitPrice: number;
  quantity: number;
  primaryGemCode: string;
  beads?: Array<{ code: string; name?: string; diameterMm?: number }>;
}

export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    giftNote?: string;
  };
  items: IOrderItem[];
  pricing: {
    subtotal: number;
    discountAmount: number;
    shippingFee: number;
    finalTotal: number;
  };
  status: OrderStatus;
  cordCutLengthCm: number;
  trackingNumber?: string;
  courierName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['custom', 'premade'], default: 'custom' },
    token: { type: String },
    wristSizeCm: { type: Number, required: true },
    cordType: { type: String, default: 'silicone_stretch' },
    beadCount: { type: Number, required: true },
    beadSummary: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    primaryGemCode: { type: String, default: 'OBS' },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, index: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'United States' },
      giftNote: { type: String },
    },
    items: [OrderItemSchema],
    pricing: {
      subtotal: { type: Number, required: true },
      discountAmount: { type: Number, default: 0 },
      shippingFee: { type: Number, default: 0 },
      finalTotal: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['Placed', 'Assembling', 'QC Passed', 'Shipped', 'Delivered'],
      default: 'Placed',
      index: true,
    },
    cordCutLengthCm: { type: Number, required: true },
    trackingNumber: { type: String },
    courierName: { type: String },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
