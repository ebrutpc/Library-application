import { Book } from 'domain/entities/book.entity';
import BookRepositories from 'infra/repositories/book.repository';
import NotFoundError from 'common/errors/notFound.error';
import { BookStatus } from 'common/constants/bookStatuses.constant';
class BookService {
  static async getBooks(): Promise<Book[]> {
    return BookRepositories.getBooks();
  }
  static async getBookById(id: number): Promise<Book> {
    const book = await BookRepositories.getBookId(id);
    if (!book) {
      throw new NotFoundError(`Book with ${id} not found `);
    }
    return book;
  }
  static async createBook(name: string): Promise<void> {
    await BookRepositories.createBook(name);
  }

  static async updateBookStatus(id: number, status: BookStatus): Promise<void> {
    await BookRepositories.updateBookStatus(id, status);
  }

  static async updateBookScoreAndStatus(
    id: number,
    status: BookStatus,
    score: number,
  ): Promise<void> {
    await BookRepositories.updateBookScoreAndStatus(id, status, score);
  }
}

export default BookService;
