import NotFoundError from 'common/errors/notFound.error';
import UserRepositories from '../../infra/repositories/user.repository';
import { User } from 'domain/entities/user.entity';
import BookService from './book.service';
import {
  BookStatus,
  UserBookStatus,
} from 'common/constants/bookStatuses.constant';
import ConflictError from 'common/errors/conflict.error';
import UsersBookService from './usersBook.service';
class UserService {
  static async getUserById(id: number): Promise<User> {
    const user = await UserRepositories.getUserById(id);
    if (!user) {
      throw new NotFoundError(`User with ${id} not found `);
    }
    return user;
  }

  static async getUsers(): Promise<User[]> {
    return UserRepositories.getUsers();
  }

  static async createUser(name: string): Promise<void> {
    await UserRepositories.createUser(name);
  }

  static async borrowBook(id: number, bookId: number): Promise<void> {
    const user = await this.getUserById(id);
    const book = await BookService.getBookById(bookId);
    if (book?.status === BookStatus.UNAVAILABLE) {
      throw new ConflictError(`${book?.name} is not available.`);
    }
    await UsersBookService.borrowedUserBook(book, user);
  }

  static async returnBook(
    id: number,
    bookId: number,
    score: number,
  ): Promise<void> {
    const user = await this.getUserById(id);
    const book = await BookService.getBookById(bookId);
    const userBook = await UsersBookService.getBookWithUserIdAndBookId(
      user,
      book,
      UserBookStatus.BORROWED,
    );
    if (!userBook) {
      throw new NotFoundError(`${book.name} is not borrowed`);
    }

    book.status = BookStatus.AVAILABLE;
    userBook.status = UserBookStatus.RETURNED;
    userBook.userScore = score;
    await UsersBookService.returnedUserBook(book, userBook);
  }
}

export default UserService;
