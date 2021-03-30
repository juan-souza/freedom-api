import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Settings1617062016234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.createTable(
        new Table({
          name: 'Settings',
          columns: [
            {
              name: 'id',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
          ],
        }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.dropTable('Settings');
    }

}
