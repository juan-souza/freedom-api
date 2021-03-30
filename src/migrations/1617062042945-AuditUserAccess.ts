import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AuditUserAccess1617062042945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.createTable(
        new Table({
          name: 'AuditUserAccess',
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
      return await queryRunner.dropTable('AuditUserAccess');
    }

}
