import {
  BaseEntity,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {AccessPoint} from "./AccessPoint";

@Entity('UserSettings')
export class UserSettings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => AccessPoint)
  @JoinTable()
  accessPoints: AccessPoint[];

}


//list Exchanges


//--notificacao
//enable telegram
//enable gmail
//telegram api
//telegram key
