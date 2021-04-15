import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PortfolioCoinPortfolioTransaction1618443242851 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'PortfolioCoin_portfolioTransaction',
        columns: [
          {
            name: 'portfolioCoinId',
            type: 'integer',
            isPrimary: true,
            isUnique: false,
          },
          {
            name: 'portfolioTransactionId',
            type: 'integer',
            isPrimary: true,
            isUnique: false,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('PortfolioCoin_portfolioTransaction');
  }
}
