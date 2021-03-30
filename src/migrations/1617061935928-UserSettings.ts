import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserSettings1617061935928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.createTable(
        new Table({
          name: 'UserSettings',
          columns: [
            {
              name: 'id',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            }
          ],
        }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.dropTable('UserSettings');
    }

}
