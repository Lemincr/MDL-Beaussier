import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mdl_beaussier';

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connexion MongoDB réussie (base: mdl_beaussier)');
  } catch (err) {
    console.error('Erreur de connexion MongoDB :', err);
    process.exit(1);
  }
}
