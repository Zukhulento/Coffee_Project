// src/entities/Debt.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Purchase } from "./Purchase";
import { User } from "./User";

@Entity()
export class Debt {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.debts)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.debts)
  @JoinColumn({ name: "purchaseId" })
  purchase!: Purchase;

  @Column()
  purchaseId!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column({ default: false })
  paid!: boolean;

  @Column({ nullable: true, type: "datetime2" })
  paidAt!: Date | null;
}
