import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', userRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

export default app;
