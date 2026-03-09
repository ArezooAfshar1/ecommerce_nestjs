import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from './product.entity';

@Entity()
export class BookmarkProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.bookmarks)
  product: Product;

  @ManyToOne(() => User, user => user.bookmarks)
  user: User;
}
