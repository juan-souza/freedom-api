import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* FIXME: AUDITORIA DE LOGIN / DATA USER IP TYPE */
@Entity('AuditUserAccess')
export class AuditUserAccess extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}



