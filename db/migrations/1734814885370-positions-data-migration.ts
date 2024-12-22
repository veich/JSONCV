import { Position } from "src/positions/entities/position.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PositionsDataMigration1734814885370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const positionsRepositiory = queryRunner.manager.getRepository(Position);

        // improving on skills migration
        // single query to insert all values
        // instead of multiple await calls for each data row
        const positions = [
            'FE Developer', 'Backend Developer', 'iOS Developer',
            'Android Developer', 'Machine Learning Engineer', 'DevOps Engineer'
        ].map((positionName) => positionsRepositiory.create({ positionName }));

        await positionsRepositiory.save(positions);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from(Position)
            .execute();
    }

}
