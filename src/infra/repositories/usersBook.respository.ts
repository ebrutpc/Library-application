import { UserBookRepository } from 'domain/entities/entitiesWithRepository';
import { UsersBook } from 'domain/entities/userBookBorrowings.entity';
import { UserBookStatus } from 'common/constants/bookStatuses.constant';
import { Book } from 'domain/entities/book.entity';
import { User } from 'domain/entities/user.entity';

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
      .select('AVG(ubook.userScore)', 'avegrageUserScore')
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
}
export default UsersBookRespositories;
