import { Expose } from 'class-transformer';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { CommonDB } from './common-db';
import { Ingredientlog } from './ingredientlog.entity';
import { Inventory } from './inventory.entity';
import { Store } from './store.entity';
import { Unit } from './unit.entity';
import { User } from './user.entity';

@Entity()
export class Ingredient extends CommonDB {
  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @Column({ type: 'float4' })
  quantity: number;

  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @Column({ type: 'varchar', length: '255' })
  exp: Date;

  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @OneToMany(() => Inventory, (inventory) => inventory.ingredient)
  inventories: Inventory[];

  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @OneToMany(() => Ingredientlog, (ingredientlog) => ingredientlog.ingredient)
  ingredientlog: Ingredientlog[];

  @Expose({ groups: ['ingredient_show'] })
  @ManyToOne(() => User, (user) => user.ingredients)
  user: User | number;

  @Expose({ groups: ['ingredient_show', 'category_show'] })
  @ManyToOne(() => Category, (categories) => categories.ingredient)
  categories: Category | number;

  @Expose({ groups: ['ingredient_show', 'unit_show'] })
  @ManyToOne(() => Unit, (units) => units.ingredient)
  units: Unit | number;

  @Expose({ groups: ['ingredient_show', 'store_show'] })
  @ManyToOne(() => Store, (stores) => stores.ingredient)
  stores: Store | number;
}
