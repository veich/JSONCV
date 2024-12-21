import { Position } from "src/positions/entities/position.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PositionsDataMigration1734814885370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const positionsRepositiory = queryRunner.manager.getRepository(Position);
        [
            'FE Developer', 'Backend Developer', 'iOS Developer',
            'Android Developer', 'Machine Learning Engineer', 'DevOps Engineer'
        ].forEach(async (positionName) => {
            const position = await positionsRepositiory.create({ positionName });
            await positionsRepositiory.save(position);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from(Position)
            .execute();
    }

}
