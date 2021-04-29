import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserSettingsAccessPoints1617064564005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'User_accessPoints',
        columns: [
          {
            name: 'userId',
            type: 'integer',
            isPrimary: true,
            isUnique: false,
          },
          {
            name: 'accessPointId',
            type: 'integer',
            isPrimary: true,
            isUnique: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('User_accessPoints');
  }

}
