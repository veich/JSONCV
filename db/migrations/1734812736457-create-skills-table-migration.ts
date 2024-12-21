import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSkillsTableMigration1734812736457 implements MigrationInterface {
    name = 'CreateSkillsTableMigration1734812736457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "skillName" character varying NOT NULL, CONSTRAINT "UQ_69094df6e76415f3a39a369ba66" UNIQUE ("skillName"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
