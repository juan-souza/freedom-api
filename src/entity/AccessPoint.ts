import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Exchange from "./enum/Exchange";

@Entity('AccessPoint')
export class AccessPoint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createDate: number;

  @Column()
  apiKey: string;

  @Column()
  secretKey: string;

  @Column('int')
  exchange: Exchange;

}


