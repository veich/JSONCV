import { Experience } from "src/experiences/entities/experience.entity";
import { Position } from "src/positions/entities/position.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { In, MigrationInterface, QueryRunner } from "typeorm";

export class CreateDefaultUserDataMigration1734869356128 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE USER

        const userRepo = queryRunner.manager.getRepository(User);
        const user = userRepo.create({
            name: 'Zeljko Will Veic',
            email: 'will@willveic.com',
            // password: 'password1'
            passwordHash: '$2b$10$CHjYd5AnTr9TDVMvgmRTCOiHk5It6dYR1MWCp5Jd5vpyvgk6izrHq',
        });
        await userRepo.save(user);

        // CREATE EXPERIENCES

        const experiencesRepo = queryRunner.manager.getRepository(Experience);
        const skillsRepo = queryRunner.manager.getRepository(Skill);
        const positionsRepo = queryRunner.manager.getRepository(Position);

        const iosPosition = await positionsRepo.findOne({ where: { positionName: 'iOS Developer' } });
        const objctivecSkill = await skillsRepo.findOne({ where: { skillName: 'Objective-C' } });

        const frontendPosition = await positionsRepo.findOne({ where: { positionName: 'FE Developer' } });
        const frontendSkills = await skillsRepo.find({
            where: {
                skillName: In(['HTML', 'CSS', 'JavaScript', 'jQuery']),
            }
        });

        const experience1 = experiencesRepo.create({
            startDate: '2014-07',
            endDate: '2015-09',
            description: 'Building vitamin measurement app and maintaining personal finance app.',
            position: iosPosition,
            skills: [objctivecSkill],
            user,
        });
        await experiencesRepo.save(experience1);

        const experience2 = experiencesRepo.create({
            startDate: '2014-10',
            endDate: '2015-06',
            description: 'Implementing new design on exisiting custom platform for scientific publishing',
            position: frontendPosition,
            skills: frontendSkills,
            user,
        });
        await experiencesRepo.save(experience2);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepo = queryRunner.manager.getRepository(User);
        const user = await userRepo.findOne({ where: { email: 'will@willveic.com' } });
        await userRepo.remove(user);
    }

}
