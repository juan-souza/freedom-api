import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import AccessPointType from "./enum/AccessPointType";

@Entity('AccessPoint')
export class AccessPoint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  type: AccessPointType;

  @Column('datetime')
  createDate: Date;

  @Column()
  apiKey: string;

  @Column()
  secretKey: string;

  @Column()
  wallet: string;

}


