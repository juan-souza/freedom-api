import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PortfolioTrackerPortfolioCoin1618443202961 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'PortfolioTracker_portfolioCoin',
        columns: [
          {
            name: 'portfolioTrackerId',
            type: 'integer',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'portfolioCoinId',
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
    return await queryRunner.dropTable('PortfolioTracker_portfolioCoin');
  }

}
