import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { UsersBook } from './userBookBorrowings.entity';
import { BookStatus } from '../../common/constants/bookStatuses.constant';

@Index(['id', 'status'])
@Entity({ name: 'Books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, unique: true })
  @Index({ unique: true })
  name: string;

  @Column({
    type: 'decimal',
    default: -1,
  })
  score: number;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.AVAILABLE,
  })
  status: string;

  @OneToMany(() => UsersBook, (userBook) => userBook.user)
  borrowedBy: UsersBook[];
}
