import { Router } from 'express';
import BookController from 'api/controllers/book.controller';
import requestValidator from 'common/middlewares/validator.middleware';
import CreateBook from 'api/validators/books/createBookRequest.validator';
import GetBookWithId from 'api/validators/books/getBookRequest.validator';

const route = Router();

route.get('/', BookController.getBooks);
route.get('/:id', GetBookWithId, requestValidator(), BookController.getBookId);
route.post('/', CreateBook, requestValidator(), BookController.createBook);

export default route;
