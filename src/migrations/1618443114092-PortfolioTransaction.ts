import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PortfolioTransaction1618443114092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'PortfolioTransaction',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'date',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'fee',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'notes',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('PortfolioTransaction');
  }

}
