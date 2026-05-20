import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null, seeded: false };
}

async function seedAdmin() {
  if (cached.seeded) return;
  try {
    // Import dynamically to avoid circular dependency
    const User = (await import('@/models/User')).default;
    const exists = await User.findOne({ email: 'admin@gmail.com', role: 'admin' });
    if (!exists) {
      await User.create({
        name: 'Administrator',
        email: 'admin@gmail.com',
        password: 'admin1234',
        role: 'admin',
        isVerified: true,
      });
      console.log('✅ Default admin account created: admin@gmail.com / admin1234');
    }
    cached.seeded = true;
  } catch (err) {
    console.error('Admin seed error:', err);
  }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Seed default admin after connecting
  await seedAdmin();

  return cached.conn;
}

export default dbConnect;
