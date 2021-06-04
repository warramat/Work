import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class MyBase extends BaseEntity {
  @Expose({
    groups: [
      'unit_show',
      'category_show',
      'store_show',
      'ingredient_show',
      'inventory_show',
    ],
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Expose({
    groups: [
      'unit_show',
      'category_show',
      'store_show',
      'ingredient_show',
      'inventory_show',
    ],
  })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Expose({
    groups: [
      'unit_show',
      'category_show',
      'store_show',
      'ingredient_show',
      'inventory_show',
    ],
  })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @Expose({
    groups: [
      'unit_show',
      'category_show',
      'store_show',
      'ingredient_show',
      'inventory_show',
    ],
  })
  @Column({ default: false })
  isDelete: boolean;
}
