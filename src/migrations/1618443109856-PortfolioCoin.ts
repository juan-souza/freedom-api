import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PortfolioCoin1618443109856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'PortfolioCoin',
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
            name: 'coinId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'symbol',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'pair',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'totalQuantity',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'totalFee',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'totalProfit',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'totalProfitPercent',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'totalSpent',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'avgPrice',
            type: 'integer',
            isNullable: false
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('PortfolioCoin');
  }

}
