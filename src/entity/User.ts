import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn,} from "typeorm";
import bcrypt from 'bcryptjs'
import Roles from "./Roles";

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

/*  @Column({
    type: "enum",
    enum: Roles,
    default: [Roles.NONE]
  })
  role: Roles;*/

 /* @Column('int')
  status: UserStatus;

*/

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
