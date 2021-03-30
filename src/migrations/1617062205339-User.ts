import {MigrationInterface, QueryRunner} from "typeorm";

export class User1617062205339 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE User ADD settingsId int(11)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
