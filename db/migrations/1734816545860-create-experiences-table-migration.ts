import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExperiencesTableMigration1734816545860 implements MigrationInterface {
    name = 'CreateExperiencesTableMigration1734816545860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, "positionId" integer, CONSTRAINT "REL_b1c987c848c258ce94a18b8e15" UNIQUE ("positionId"), CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experience_skills_skill" ("experienceId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_06093a8c1118b15ba49336556b6" PRIMARY KEY ("experienceId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_867897d509ba908b41666ff243" ON "experience_skills_skill" ("experienceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd2ee170470bd7596709bb854a" ON "experience_skills_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_b1c987c848c258ce94a18b8e15e" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_skills_skill" ADD CONSTRAINT "FK_867897d509ba908b41666ff2433" FOREIGN KEY ("experienceId") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "experience_skills_skill" ADD CONSTRAINT "FK_bd2ee170470bd7596709bb854a2" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience_skills_skill" DROP CONSTRAINT "FK_bd2ee170470bd7596709bb854a2"`);
        await queryRunner.query(`ALTER TABLE "experience_skills_skill" DROP CONSTRAINT "FK_867897d509ba908b41666ff2433"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_b1c987c848c258ce94a18b8e15e"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd2ee170470bd7596709bb854a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_867897d509ba908b41666ff243"`);
        await queryRunner.query(`DROP TABLE "experience_skills_skill"`);
        await queryRunner.query(`DROP TABLE "experience"`);
    }

}
