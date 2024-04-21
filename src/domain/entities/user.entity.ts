import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { UsersBook } from './userBookBorrowings.entity';

@Entity({ name: 'Users ' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, nullable: false, unique: true })
  @Index({ unique: true })
  name: string;

  @OneToMany(() => UsersBook, (userBook) => userBook.user)
  borrowedBooks: UsersBook[];
}
