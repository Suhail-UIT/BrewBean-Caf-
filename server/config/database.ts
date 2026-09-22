import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ProductModel } from '../models/mongoose/Product';
import { UserModel } from '../models/mongoose/User';
import { INITIAL_PRODUCTS } from '../models/initialData';

export const DEFAULT_JWT_SECRET =
  process.env.JWT_SECRET ||
  '3011eb22c25f027b1d51e98ad8110532ce956d3804804ef22863eca299dc4357d62c1eedcc1d64282356d0254ba5bb3c611ddeef267dc17398d345e94bd372bd';

export const DEFAULT_MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://suhail6676khan_db_user:a5nfMDTXiUDUvzQF@cluster0.evkaxt1.mongodb.net/brewbean?retryWrites=true&w=majority';

/**
 * Sanitizes MongoDB URIs where passwords contain special characters like '@'.
 */
export function sanitizeMongoUri(rawUri: string): string {
  if (!rawUri) return '';
  try {
    const srvPrefix = 'mongodb+srv://';
    const standardPrefix = 'mongodb://';
    const hasSrv = rawUri.startsWith(srvPrefix);
    const hasStandard = rawUri.startsWith(standardPrefix);

    if (!hasSrv && !hasStandard) return rawUri;

    const prefix = hasSrv ? srvPrefix : standardPrefix;
    const withoutPrefix = rawUri.slice(prefix.length);

    // Find the LAST '@' which separates credentials from host
    const lastAtIndex = withoutPrefix.lastIndexOf('@');
    if (lastAtIndex === -1) return rawUri;

    const userInfo = withoutPrefix.slice(0, lastAtIndex);
    let hostAndQuery = withoutPrefix.slice(lastAtIndex + 1);

    // If no db path is set before query string, add /brewbean
    if (hostAndQuery.startsWith('?') || hostAndQuery.startsWith('/?')) {
      hostAndQuery = 'brewbean' + (hostAndQuery.startsWith('/?') ? hostAndQuery.slice(1) : hostAndQuery);
    } else if (!hostAndQuery.includes('/') && hostAndQuery.includes('?')) {
      const qIdx = hostAndQuery.indexOf('?');
      hostAndQuery = hostAndQuery.slice(0, qIdx) + '/brewbean' + hostAndQuery.slice(qIdx);
    }

    const colonIndex = userInfo.indexOf(':');
    if (colonIndex === -1) return rawUri;

    const username = userInfo.slice(0, colonIndex);
    const password = userInfo.slice(colonIndex + 1);

    // Properly encode credentials
    const encodedUser = encodeURIComponent(decodeURIComponent(username));
    const encodedPassword = encodeURIComponent(decodeURIComponent(password));

    return `${prefix}${encodedUser}:${encodedPassword}@${hostAndQuery}`;
  } catch (err) {
    return rawUri;
  }
}

interface DbStatus {
  connected: boolean;
  type: 'mongodb' | 'local_storage';
  uriDisplay: string;
  databaseName?: string;
  error?: string | null;
}

let dbStatus: DbStatus = {
  connected: false,
  type: 'local_storage',
  uriDisplay: 'Local Persistent Storage',
  error: null,
};

export function getDbStatus(): DbStatus {
  return dbStatus;
}

export async function connectDatabase(): Promise<boolean> {
  const rawUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
  const sanitizedUri = sanitizeMongoUri(rawUri);

  // Mask password for display
  const maskedUri = rawUri.replace(/(:\/\/[^:]+:)([^@]+)(@)/, '$1******$3');
  dbStatus.uriDisplay = maskedUri;

  console.log(`\nConnecting to MongoDB at: ${maskedUri}`);

  try {
    // Connect with a 7-second serverSelectionTimeout to keep server responsive
    await mongoose.connect(sanitizedUri, {
      serverSelectionTimeoutMS: 7000,
      connectTimeoutMS: 7000,
      dbName: 'brewbean',
    });

    dbStatus = {
      connected: true,
      type: 'mongodb',
      uriDisplay: maskedUri,
      databaseName: mongoose.connection.name || 'brewbean',
      error: null,
    };

    console.log(`Connected to MongoDB Atlas successfully! Database: "${mongoose.connection.name}"`);

    // Seed initial data if MongoDB is empty
    await seedMongoDatabase();

    return true;
  } catch (error: any) {
    const errorMsg = error?.message || 'Connection failed';
    dbStatus = {
      connected: false,
      type: 'local_storage',
      uriDisplay: `${maskedUri} (Offline - using Local Fallback)`,
      error: errorMsg,
    };

    console.warn(`\n⚠️  MongoDB connection note: ${errorMsg}`);
    console.warn(
      `ℹ️  Running seamlessly with Local Persistent Database (data/brewbean_db.json).\n` +
      `   If using MongoDB Atlas, ensure "Network Access" in Atlas whitelist allows access from anywhere (0.0.0.0/0).\n`
    );
    return false;
  }
}

async function seedMongoDatabase() {
  try {
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      console.log('📦 Seeding initial products to MongoDB Atlas...');
      const cleanProducts = INITIAL_PRODUCTS.map((p) => {
        const { _id, ...rest } = p;
        return rest;
      });
      await ProductModel.insertMany(cleanProducts);
      console.log(`Seeded ${cleanProducts.length} menu items into MongoDB!`);
    }

    const adminUser = await UserModel.findOne({ email: 'admin@brewbeancafe.in' });
    if (!adminUser) {
      console.log('👤 Creating default admin account in MongoDB Atlas...');
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync('adminpassword123', salt);

      await UserModel.create({
        name: 'BrewBean Admin',
        email: 'admin@brewbeancafe.in',
        phone: '+91 98765 42180',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin account created in MongoDB: admin@brewbeancafe.in / adminpassword123');
    }
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
  }
}
