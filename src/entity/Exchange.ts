import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExchangesType from "./enum/ExchangesType";

//@Entity('Exchange')
export class Exchange extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apiKey: string;

  @Column()
  secretKey: string;

  @Column('int')
  type: ExchangesType;
}
