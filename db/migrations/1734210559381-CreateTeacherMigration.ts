import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeacherMigration1734210559381 implements MigrationInterface {
    name = 'CreateTeacherMigration1734210559381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "teacher"`);
    }

}
