import { Request, Response } from 'express-serve-static-core';
import UserService from '../services/user.service';
import HttpStatusCode from 'common/constants/httpstatusCode.constant';
import InternalServerError from 'common/errors/internalServer.error';
import { matchedData } from 'express-validator';
import UsersBookService from 'api/services/usersBook.service';
import { UserDetailDto } from '../../domain/models/response/userDetail.dto';

class UserController {
  static async getUserById(req: Request, res: Response) {
    const { id } = matchedData(req, { locations: ['params'] });
    try {
      const user = await UserService.getUserById(id);
      const userWithBookDetail = await UsersBookService.getUserBookDetail(user);
      const response: UserDetailDto = {
        id: user.id,
        name: user.name,
        books: {
          past: userWithBookDetail.past,
          present: userWithBookDetail.present,
        },
      };
      return res.status(HttpStatusCode.OK).json(response);
    } catch (error: any) {
      return res
        .status(error.code || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      return res.status(HttpStatusCode.OK).json(users);
    } catch (error) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new InternalServerError());
    }
  }

  static async createUser(req: Request, res: Response) {
    const { name } = matchedData(req, { locations: ['body'] });
    try {
      await UserService.createUser(name);
      return res.status(HttpStatusCode.CREATED).json();
    } catch (error: any) {
      return res
        .status(error.code || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  static async borrowBook(req: Request, res: Response) {
    const { id, bookId } = matchedData(req, { locations: ['params'] });
    try {
      await UserService.borrowBook(id, bookId);
      return res.status(HttpStatusCode.NO_CONTENT).json();
    } catch (error: any) {
      return res
        .status(error.code || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  static async returnBook(req: Request, res: Response) {
    const { id, bookId } = matchedData(req, { locations: ['params'] });
    const { score } = matchedData(req, { locations: ['body'] });

    try {
      await UserService.returnBook(id, bookId, score);
      return res.status(HttpStatusCode.NO_CONTENT).json();
    } catch (error: any) {
      return res
        .status(error.code || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

export default UserController;
