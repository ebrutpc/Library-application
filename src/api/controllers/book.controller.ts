import { Request, Response } from 'express-serve-static-core';
import BookService from 'api/services/book.service';
import HttpStatusCode from 'common/constants/httpstatusCode.constant';
import InternalServerError from 'common/errors/internalServer.error';
import { matchedData } from 'express-validator';
import { BookDto } from 'domain/models/response/book.dto';
class BookController {
  static async getBooks(req: Request, res: Response) {
    try {
      const books = await BookService.getBooks();
      return res.status(HttpStatusCode.OK).json(books);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new InternalServerError());
    }
  }

  static async getBookId(req: Request, res: Response) {
    const { id } = matchedData(req, { locations: ['params'] });
    try {
      const book = await BookService.getBookById(id);
      const response: BookDto = {
        id: book.id,
        name: book.name,
        score: book.score,
      };
      return res.status(HttpStatusCode.OK).json(response);
    } catch (error: any) {
      return res
        .status(error.code || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  static async createBook(req: Request, res: Response) {
    const { name } = matchedData(req, { locations: ['body'] });
    try {
      await BookService.createBook(name);
      return res.status(HttpStatusCode.CREATED).json();
    } catch (error: any) {
      return res
        .status(error.code || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

export default BookController;
