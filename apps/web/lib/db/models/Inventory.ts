import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInventoryItem extends Document {
  gemCode: string;
  name: string;
  stockCounts: {
    '6mm': number;
    '8mm': number;
    '10mm': number;
    '12mm': number;
  };
  prices: {
    '6mm': number;
    '8mm': number;
    '10mm': number;
    '12mm': number;
  };
  isAvailable: boolean;
  updatedAt: Date;
}

const InventorySchema = new Schema<IInventoryItem>(
  {
    gemCode: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    stockCounts: {
      '6mm': { type: Number, default: 500 },
      '8mm': { type: Number, default: 1000 },
      '10mm': { type: Number, default: 400 },
      '12mm': { type: Number, default: 250 },
    },
    prices: {
      '6mm': { type: Number, required: true },
      '8mm': { type: Number, required: true },
      '10mm': { type: Number, required: true },
      '12mm': { type: Number, required: true },
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const InventoryItem: Model<IInventoryItem> =
  mongoose.models.InventoryItem || mongoose.model<IInventoryItem>('InventoryItem', InventorySchema);
