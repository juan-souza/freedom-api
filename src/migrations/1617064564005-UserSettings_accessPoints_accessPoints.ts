import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserSettingsAccessPointsAccessPoints1617064564005 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'UserSettings_accessPoints_accessPoints',
        columns: [
          {
            name: 'userSettingsId',
            type: 'integer',
            isPrimary: true,
            isUnique: true,
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
  }

}
