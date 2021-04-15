import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('UserSettings')
export class UserSettings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}
