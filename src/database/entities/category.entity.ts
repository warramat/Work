import { Expose } from 'class-transformer';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { CommonDB } from './common-db';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Category extends CommonDB {
  @Expose({ groups: ['category_show', 'ingredient_show'] })
  @Column({ type: 'varchar' })
  name: string;

  @Expose({ groups: ['category_show', 'ingredient_show'] })
  @OneToMany(() => Ingredient, (ingredients) => ingredients.categories)
  ingredient: Ingredient[];
}
