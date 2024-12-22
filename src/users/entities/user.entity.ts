import { ApiProperty } from "@nestjs/swagger";
import { Experience } from "src/experiences/entities/experience.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @ApiProperty()
  // dynamically computed - not part of the user DB table
  skills: string[];

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];
}
