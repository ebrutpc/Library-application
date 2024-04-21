import DataSource from '../../infra/databases/postgres.database';
import { User } from '../entities/user.entity';
import { Book } from './book.entity';
import { UsersBook } from './userBookBorrowings.entity';

const UserRepository = DataSource.getRepository(User);
const BookRepository = DataSource.getRepository(Book);
const UserBookRepository = DataSource.getRepository(UsersBook);

export { UserRepository, BookRepository, UserBookRepository };
