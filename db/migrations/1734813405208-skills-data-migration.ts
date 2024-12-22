import { Skill } from "src/skills/entities/skill.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SkillsDataMigration1734813405208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const skillsRepositiory = queryRunner.manager.getRepository(Skill);
        [
            'NodeJS', 'TypeScript', 'Sequelize', 'TypeORM', 'PostgreSQL',
            'Objective-C', 'Java', 'Swift', 'Kotlin', 'Python',
            'HTML', 'CSS', 'JavaScript', 'jQuery'
        ].forEach(async (skillName) => {
            const skill = await skillsRepositiory.create({ skillName });
            await skillsRepositiory.save(skill);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from(Skill)
            .execute();
    }
}
