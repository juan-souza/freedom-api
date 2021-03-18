import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn,} from "typeorm";
import bcrypt from 'bcryptjs'
import Roles from "./Roles";
import UserStatusInfo from "./UserStatusInfo";

@Entity('User')
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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isValidPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
