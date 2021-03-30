import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import Roles from '../entity/enum/Roles';
import UserStatusInfo from '../entity/enum/UserStatusInfo';

export class User1615822718500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'int',
            isNullable: false,
            default: Roles.GUEST,
          },
          {
            name: 'statusInfo',
            type: 'int',
            isNullable: false,
            default: UserStatusInfo.PENDING_CONFIRM_EMAIL,
          },
          {
            name: 'active',
            type: 'tinyint(1)',
            isNullable: false,
            default: true,
          },
          {
            name: 'createDate',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'updateDate',
            type: 'integer',
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.dropTable('User');
  }
}
