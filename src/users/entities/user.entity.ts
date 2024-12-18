import { ApiProperty } from "@nestjs/swagger";
import { IsJSON } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({ nullable: true })
  skills: string;
  // TODO:
  // - add additional tables - no more time now
  // - this field wouldn't be in DB at all
  // - should be dynamically generated summary info when returning user
  //   (from user -> work_experiences[] -> skills[])
  //   Example:
  //   "skills": "NodeJS, TypeScript, TypeORM"
}
