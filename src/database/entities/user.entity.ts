import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonDB } from './common-db';
import { Ingredient } from './ingredient.entity';

@Entity()
export class User extends CommonDB {
  @Expose({ groups: ['user_show'] })
  @Column({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Expose({ groups: ['user_show'] })
  @Column({ type: 'varchar', length: '255' })
  username: string;

  @Expose({ groups: [] })
  @Column({ type: 'text' })
  password: string;

  @Expose({ groups: ['user_show'] })
  @IsEmail()
  @Column({ type: 'varchar', length: '255' })
  email: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.user)
  ingredients: Ingredient[];
}
