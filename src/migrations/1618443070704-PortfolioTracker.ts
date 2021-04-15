import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PortfolioTracker1618443070704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'PortfolioTracker',
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
            name: 'exchange',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'totalFee',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'totalProfit',
            type: 'integer',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'totalProfitPercent',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'totalSpent',
            type: 'integer',
            isNullable: false
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.dropTable('PortfolioTracker');
  }
}
