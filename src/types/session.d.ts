import 'express-session';
import { UserRole } from '../models/User';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    userName?: string;
    userEmail?: string;
    userRole?: UserRole;
  }
}
