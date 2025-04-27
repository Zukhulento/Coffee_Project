import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

// Creating Payment entity
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.payments)
  user!: User;

  @Column()
  paid!: boolean;

  @Column()
  month!: string;
}
