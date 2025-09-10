import mongoose from "mongoose";

const db = process.env.mongoURI;

if (!db) {
  throw new Error("❌ No MongoDB URI found in environment variables");
}
const dbString:string = `${db}mahiRepo`


if (!(global as any).mongoose) {
  (global as any).mongoose = { conn: null, promise: null };
}

const cached = (global as any).mongoose;

async function connect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log("✅ Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⚡ Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(dbString, { bufferCommands: false }) // ✅ dbString is guaranteed string
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
export default connect;
