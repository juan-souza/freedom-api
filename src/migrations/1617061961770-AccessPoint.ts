import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AccessPoint1617061961770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'AccessPoint',
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
            name: 'createDate',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'apiKey',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'secretKey',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'exchange',
            type: 'integer',
            isNullable: false,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('AccessPoint');
  }

}
