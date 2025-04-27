import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Payment } from "./Payment";

// Creating user class
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments!: Payment[];
  
  @Column()
  password!: string;
}
