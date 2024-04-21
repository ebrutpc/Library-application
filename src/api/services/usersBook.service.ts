import { UserBookStatus } from 'common/constants/bookStatuses.constant';
import { Book } from 'domain/entities/book.entity';
import { User } from 'domain/entities/user.entity';
import { Past, Present } from 'domain/models/response/userDetail.dto';
import UsersBookRespositories from 'infra/repositories/usersBook.respository';
import { UsersBook } from 'domain/entities/userBookBorrowings.entity';
class UsersBookService {
  static async createUsersBook(user: User, book: Book): Promise<void> {
    await UsersBookRespositories.createUsersBook(user, book);
  }

  static async getBookWithUserIdAndBookId(
    user: User,
    book: Book,
    status: UserBookStatus,
  ) {
    return UsersBookRespositories.getBookWithUserIdAndBookId(
      user,
      book,
      status,
    );
  }

  static async updateScoreAndStatus(
    id: number,
    status: UserBookStatus,
    score: number,
  ): Promise<void> {
    await UsersBookRespositories.updateScoreAndStatus(id, status, score);
  }

  static async calculateReturnedBookAvarageScore(book: Book): Promise<number> {
    const [UsersBooks, count] = await UsersBookRespositories.getUBooksAndCount(
      book,
      UserBookStatus.RETURNED,
    );

    const totalScore = UsersBooks.reduce(
      (acc, curVal) => acc + curVal.userScore,
      0,
    );
    return totalScore / count;
  }

  static async getUserBookDetail(
    user: User,
  ): Promise<{ past: Past[]; present: Present[] }> {
    const userBookDetails =
      await UsersBookRespositories.getUserBookDetail(user);
    const past: Past[] = [];
    const present: Present[] = [];
    userBookDetails.map((ub: UsersBook) => {
      if (ub.status === UserBookStatus.BORROWED) {
        present.push({
          name: ub.book.name,
        });
      } else if (ub.status === UserBookStatus.RETURNED) {
        past.push({
          name: ub.book.name,
          userScore: ub.userScore,
        });
      }
    });
    return {
      past,
      present,
    };
  }
}
export default UsersBookService;
