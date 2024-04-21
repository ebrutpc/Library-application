import { Router } from 'express';
import userRoutes from './api/routes/user.route';
import bookRoutes from './api/routes/book.route';

const appRoute = Router();
appRoute.use('/users', userRoutes);
appRoute.use('/books', bookRoutes);

export default appRoute;
