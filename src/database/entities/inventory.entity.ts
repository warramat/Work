import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonDB } from './common-db';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Inventory extends CommonDB {
  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @Column({ type: 'float4', default: 0 })
  quantity: number;

  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.inventories)
  ingredient: Ingredient | number;
}
