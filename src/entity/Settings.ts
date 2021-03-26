import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExchangesType from "./enum/ExchangesType";

// @Entity('Settings')
export class Settings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}
