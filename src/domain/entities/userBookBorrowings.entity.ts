import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import { UserBookStatus } from '../../common/constants/bookStatuses.constant';

@Index(['id', 'status'])
@Entity({ name: 'UsersBook' })
export class UsersBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserBookStatus,
    default: UserBookStatus.BORROWED,
  })
  status: string;

  @Column({
    type: 'int',
    default: 0,
  })
  userScore: number;

  @ManyToOne(() => User, (user) => user.borrowedBooks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.borrowedBy)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
