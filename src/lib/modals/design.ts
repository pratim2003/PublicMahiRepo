import mongoose, { Schema, Document, Model } from "mongoose";


export interface DesignEntry extends Document {
  containt: string;
  heading: string;
  subHead1?: string;
  subHead2?: string;
  image?: string;
}


const DesignSchema = new Schema<DesignEntry>(
  {
    containt: { type: String, required: true },
    heading: { type: String, required: true },
    subHead1: { type: String },
    subHead2: { type: String },
    image : String
  },
  { timestamps: true, collection: "design" } 
);


export const DesignModel: Model<DesignEntry> =
  mongoose.models.Design || mongoose.model<DesignEntry>("Design", DesignSchema);
