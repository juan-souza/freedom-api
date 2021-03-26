import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExchangesType from "./enum/ExchangesType";

/* FIXME: AUDITORIA DE LOGIN / DATA USER IP TYPE */
// @Entity('AuditUserAcess')
export class AuditUserAccess extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}



