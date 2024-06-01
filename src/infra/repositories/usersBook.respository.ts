import { UserBookRepository } from 'domain/entities/entitiesWithRepository';
import { UsersBook } from 'domain/entities/userBookBorrowings.entity';
import { UserBookStatus } from 'common/constants/bookStatuses.constant';
import { Book } from 'domain/entities/book.entity';
import { User } from 'domain/entities/user.entity';
import DataSource from '../../infra/databases/postgres.database';

class UsersBookRespositories {
  static async createUsersBook(user: User, book: Book): Promise<void> {
    const usersBook = UserBookRepository.create({
      user,
      book,
    });
    await UserBookRepository.save(usersBook);
  }

  static async getBookWithUserIdAndBookId(
    user: User,
    book: Book,
    status: UserBookStatus,
  ) {
    return UserBookRepository.findOne({
      where: {
        user,
        book,
        status,
      },
    });
  }

  static async updateScoreAndStatus(
    id: number,
    status: UserBookStatus,
    score: number,
  ) {
    await UserBookRepository.createQueryBuilder()
      .update(UsersBook)
      .set({ status, userScore: score })
      .where('id = :id', { id })
      .execute();
  }

  static async getUBooksUserScoreAverage(book: Book, status: UserBookStatus) {
    return UserBookRepository.createQueryBuilder('ubook')
      .select('AVG(ubook.userScore)', 'avgScore')
      .groupBy('ubook.bookId')
      .addGroupBy('ubook.status')
      .where('ubook.bookId = :bookId and ubook.status = :status', {
        bookId: book.id,
        status: status,
      })
      .getRawOne();
  }

  static async getUserBookDetail(user: User) {
    return UserBookRepository.createQueryBuilder('ubook')
      .leftJoinAndSelect('ubook.book', 'book')
      .where('ubook.userId = :userId', { userId: user.id })
      .getMany();
  }

  static async returnUserBookUpdates(book: Book, userBook: UsersBook) {
    await DataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(
        UsersBook,
        { id: userBook.id },
        { status: userBook.status, userScore: userBook.userScore },
      );
      const avegrageUserScore = await this.getUBooksUserScoreAverage(
        book,
        UserBookStatus.RETURNED,
      );
      book.score =
        book.score === -1 && !avegrageUserScore
          ? userBook.userScore
          : avegrageUserScore.avgScore;

      await transactionalEntityManager.update(
        Book,
        { id: book.id },
        { status: book.status, score: book.score },
      );
    });
  }

  static async borrowedUserBook(book: Book, user: User) {
    await DataSource.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager.save(UsersBook, {
        user,
        book,
      });
      transactionalEntityManager.update(
        Book,
        { id: book.id },
        { status: book.status },
      );
    });
  }
}
export default UsersBookRespositories;
