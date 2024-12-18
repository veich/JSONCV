import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSkillsColumnMigration1734557863401 implements MigrationInterface {
    name = 'UserSkillsColumnMigration1734557863401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "skills" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "skills"`);
    }

}
