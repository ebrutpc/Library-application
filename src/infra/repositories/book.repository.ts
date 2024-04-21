import { BookRepository } from 'domain/entities/entitiesWithRepository';
import { Book } from 'domain/entities/book.entity';
import InternalServerError from 'common/errors/internalServer.error';
import ConflictError from '../../common/errors/conflict.error';
import db from '../../infra/databases/postgres.database';
import { BookStatus } from 'common/constants/bookStatuses.constant';

class BookRepositories {
  static async createBook(name: string): Promise<void> {
    const book = BookRepository.create({ name });
    try {
      const found = await BookRepository.findOne({
        where: { name },
      });
      if (found) {
        throw new ConflictError('Book already exists.');
      }
      await BookRepository.save(book);
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error;
      } else {
        throw new InternalServerError();
      }
    }
  }

  static async getBookId(id: number): Promise<Book | null> {
    return BookRepository.findOne({ where: { id } });
  }

  static async getBooks(): Promise<Book[]> {
    return BookRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  static async updateBookStatus(id: number, status: BookStatus): Promise<void> {
    await db
      .createQueryBuilder()
      .update(Book)
      .set({ status })
      .where('id = :id', { id })
      .execute();
  }

  static async updateBookScoreAndStatus(
    id: number,
    status: BookStatus,
    score: number,
  ): Promise<void> {
    await db
      .createQueryBuilder()
      .update(Book)
      .set({ status, score })
      .where('id = :id', { id })
      .execute();
  }
}

export default BookRepositories;
