import 'dotenv/config';
import app from './app';
import { connectDB } from './config/database';

const port = process.env.PORT || 3000;

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
}

startServer();
