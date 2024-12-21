import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePositionsTableMigration1734813063131 implements MigrationInterface {
    name = 'CreatePositionsTableMigration1734813063131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "positionName" character varying NOT NULL, CONSTRAINT "UQ_de801dbb403716375a0fd1d31f2" UNIQUE ("positionName"), CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "position"`);
    }

}
