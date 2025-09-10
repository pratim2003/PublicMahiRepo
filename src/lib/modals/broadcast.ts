import mongoose, { Schema, Document, Model } from "mongoose";


export interface BroadcatEntry extends Document {
  containt: string;
  heading: string;
  subHead1?: string;
  subHead2?: string;
  audio?: string;
}


const BroadcatSchema = new Schema<BroadcatEntry>(
  {
    containt: { type: String, required: true },
    heading: { type: String, required: true },
    subHead1: { type: String },
    subHead2: { type: String },
    audio : String
  },
  { timestamps: true, collection: "broadcat" } 
);


export const broadcatModel: Model<BroadcatEntry> =
  mongoose.models.broadcat || mongoose.model<BroadcatEntry>("Broadcat", BroadcatSchema);
