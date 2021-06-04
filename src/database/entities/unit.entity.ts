import { Expose } from 'class-transformer';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CommonDB } from './common-db';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Unit extends CommonDB {
  @Expose({ groups: ['unit_show', 'ingredient_show'] })
  @Column({ type: 'varchar' })
  name: string;

  @Expose({ groups: ['unit_show', 'ingredient_show'] })
  @OneToMany(() => Ingredient, (ingredients) => ingredients.units)
  ingredient: Ingredient[];
}
