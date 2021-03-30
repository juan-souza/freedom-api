import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity, JoinColumn, JoinTable, OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import Roles from './enum/Roles';
import UserStatusInfo from './enum/UserStatusInfo';
import {UserSettings} from "./UserSettings";

@Entity('User')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('int')
  role: Roles;

  @Column('int')
  statusInfo: UserStatusInfo;

  @Column()
  active: boolean;

  @Column('datetime')
  createDate: Date;

  @Column('datetime')
  updateDate: Date;

  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings: UserSettings;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }

  isValidPassword(unencryptedPassword: string):boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
