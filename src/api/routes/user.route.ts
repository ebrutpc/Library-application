import { Router } from 'express';
import UserController from '../controllers/user.controller';
import requestValidator from '../../common/middlewares/validator.middleware';
import GetUserId from '../validators/users/getUserRequest.validator';
import CreateUser from '../validators/users/createUserRequest.validator';
import BorrowBook from '../validators/users/borrowBookRequest.validator';
import ReturnBook from '../validators/users/returnBookRequestValidator';

const route = Router();

route.get('/', UserController.getUsers);
route.get('/:id', GetUserId, requestValidator(), UserController.getUserById);
route.post('/', CreateUser, requestValidator(), UserController.createUser);
route.post(
  '/:id/borrow/:bookId',
  BorrowBook,
  requestValidator(),
  UserController.borrowBook,
);
route.post(
  '/:id/return/:bookId',
  ReturnBook,
  requestValidator(),
  UserController.returnBook,
);

export default route;
