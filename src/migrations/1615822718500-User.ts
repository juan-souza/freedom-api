import {Column, MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1615822718500 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: "User",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: "name",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "password",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "email",
          type: "varchar",
          isNullable: false,
        }/*,
        {
          name: 'role',
          type: 'enum',
          enum: ['0','1','2'],
          enumName: 'Roles',
          default: '0'
        }*/

    /*    {
          name: "status",
          type: "integer",
          isNullable: false,
        }*/
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.dropTable("User");
  }

}
