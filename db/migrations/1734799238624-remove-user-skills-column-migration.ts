import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserSkillsColumnMigration1734799238624 implements MigrationInterface {
    name = 'RemoveUserSkillsColumnMigration1734799238624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "skills"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "skills" character varying`);
    }

}
