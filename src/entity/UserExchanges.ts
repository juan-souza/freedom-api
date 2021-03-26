import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExchangesType from "./enum/ExchangesType";

// @Entity('UserExchanges')
export class UserExchanges extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}
