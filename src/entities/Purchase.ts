import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

// Creating Purchase 
@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column()
  description!: string;

  @CreateDateColumn()
  purchaseDate!: Date;
}
