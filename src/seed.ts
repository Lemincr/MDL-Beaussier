import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/database';
import User from './models/User';
import Association from './models/Association';
import Event from './models/Event';
import Registration from './models/Registration';

async function seed() {
  await connectDB();

  await Registration.deleteMany({});
  await Event.deleteMany({});
  await Association.deleteMany({});
  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await User.create({
    name: 'Admin MDL',
    email: 'admin@beaussier.fr',
    password: hashedPassword,
    role: 'admin'
  });

  const manager1 = await User.create({
    name: 'Lucas Responsable BDE',
    email: 'bde@beaussier.fr',
    password: hashedPassword,
    role: 'manager'
  });

  const manager2 = await User.create({
    name: 'Sarah Responsable BDS',
    email: 'bds@beaussier.fr',
    password: hashedPassword,
    role: 'manager'
  });

  const student1 = await User.create({
    name: 'Emma Étudiante',
    email: 'emma@beaussier.fr',
    password: hashedPassword,
    role: 'student'
  });

  const student2 = await User.create({
    name: 'Hugo Étudiant',
    email: 'hugo@beaussier.fr',
    password: hashedPassword,
    role: 'student'
  });

  const bde = await Association.create({
    name: 'BDE Beaussier',
    description: 'Bureau des étudiants : soirées, intégration et animation de la vie étudiante.',
    contact: 'bde@beaussier.fr',
    logo: '/img/bde.png',
    status: 'active',
    manager: manager1._id
  });

  const bds = await Association.create({
    name: 'BDS Beaussier',
    description: 'Bureau des sports : tournois sportifs, entraînements et compétitions inter-écoles.',
    contact: 'bds@beaussier.fr',
    logo: '/img/bds.png',
    status: 'active',
    manager: manager2._id
  });

  await Association.create({
    name: 'Club Robotique',
    description: 'Conception de robots et participation à la coupe de France de robotique.',
    contact: 'robotique@beaussier.fr',
    logo: '/img/robot.png',
    status: 'inactive',
    manager: admin._id
  });

  const event1 = await Event.create({
    title: 'Soirée de rentrée',
    description: 'Rencontre entre toutes les promotions avec buffet et musique.',
    date: new Date('2026-12-10T19:00:00'),
    location: 'Foyer étudiant',
    capacity: 100,
    category: 'Soirée',
    published: true,
    association: bde._id
  });

  const event2 = await Event.create({
    title: 'Tournoi Futsal Inter-Promos',
    description: 'Tournoi par équipes de 5 joueurs. Inscription individuelle ou en équipe.',
    date: new Date('2026-12-15T14:00:00'),
    location: 'Gymnase Beaussier',
    capacity: 40,
    category: 'Sport',
    published: true,
    association: bds._id
  });

  await Event.create({
    title: 'LAN Party Hiver',
    description: 'Tournoi gaming dans la grande salle informatique.',
    date: new Date('2027-01-20T18:00:00'),
    location: 'Salle B204',
    capacity: 2,
    category: 'Gaming',
    published: false,
    association: bde._id
  });

  await Registration.create({
    user: student1._id,
    event: event1._id,
    status: 'confirmed'
  });

  await Registration.create({
    user: student2._id,
    event: event2._id,
    status: 'confirmed'
  });

  console.log('Base de données initialisée avec succès (mot de passe des comptes : password123)');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Erreur lors du seed :', err);
  process.exit(1);
});
