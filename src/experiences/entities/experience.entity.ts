import { Position } from "src/positions/entities/position.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.experiences, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @OneToOne(() => Position)
    @JoinColumn()
    position: Position;

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[];
}
