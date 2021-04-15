import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity, JoinColumn, JoinTable, ManyToMany, OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import Roles from './enum/Roles';
import UserStatusInfo from './enum/UserStatusInfo';
import {UserSettings} from "./UserSettings";
import {AccessPoint} from "./AccessPoint";
import {PortfolioTracker} from "./PortfolioTracker";

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

  @Column('integer')
  role: Roles;

  @Column('integer')
  statusInfo: UserStatusInfo;

  @Column()
  active: boolean;

  @Column()
  createDate: number;

  @Column()
  updateDate: number;

  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings: UserSettings;

  @ManyToMany(() => AccessPoint)
  @JoinTable()
  accessPoints: AccessPoint[];

  @ManyToMany(() => PortfolioTracker)
  @JoinTable()
  portfolios: PortfolioTracker[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }

  isValidPassword(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
