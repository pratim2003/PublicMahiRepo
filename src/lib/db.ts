import mongoose from 'mongoose';

const dbUri = process.env.mongoURI;
if (!dbUri) {
  throw new Error('mongodb uri is not present in env');
}
const db: string = `${dbUri}mahiRepo`;
async function connect(): Promise<void> {
  const connectionState: number = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log('database already connected');
    return;
  }
  if (connectionState === 2) {
    console.log('connecting ....');
    return;
  }
  try {
    await mongoose.connect(db);
    console.log('mongodb connected');
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}

export default connect;

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.mongoURI as string;
// if (!MONGODB_URI) {
//   throw new Error("⚠️ mongodb uri is not present in env");
// }

// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// let cached: MongooseCache = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export default async function connect(): Promise<typeof mongoose> {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
