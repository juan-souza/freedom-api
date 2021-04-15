import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Settings')
export class Settings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}
