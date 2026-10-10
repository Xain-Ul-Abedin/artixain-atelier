import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomDesign extends Document {
  token: string;
  wristSizeCm: number;
  cordType: string;
  beadCodes: string[];
  totalPrice: number;
  totalBeads: number;
  remixCount: number;
  createdAt: Date;
}

const CustomDesignSchema = new Schema<ICustomDesign>(
  {
    token: { type: String, required: true, unique: true, index: true },
    wristSizeCm: { type: Number, required: true },
    cordType: { type: String, default: 'silicone_stretch' },
    beadCodes: [{ type: String }],
    totalPrice: { type: Number, required: true },
    totalBeads: { type: Number, required: true },
    remixCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CustomDesign: Model<ICustomDesign> =
  mongoose.models.CustomDesign || mongoose.model<ICustomDesign>('CustomDesign', CustomDesignSchema);
