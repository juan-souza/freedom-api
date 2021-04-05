import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// @Entity('NotifySettings')
export class NotifySettings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}

// --notificacao
// enable telegram
// enable gmail
// telegram api
// telegram key
