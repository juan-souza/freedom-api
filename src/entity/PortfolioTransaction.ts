import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Transaction from "./enum/Transaction";

@Entity('PortfolioTransaction')
export class PortfolioTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  type: Transaction;

  @Column()
  date: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  fee: number;

  @Column()
  amount: number;

  @Column()
  notes: string;

}
