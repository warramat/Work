import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonDB } from './common-db';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Ingredientlog extends CommonDB {
  @Expose({ groups: ['inventory_show'] })
  @Column({ type: 'float4', default: 0 })
  quantity: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.ingredientlog)
  ingredient: Ingredient | number;
}
