import { CreateIngredientDto } from 'src/api/ingredients/dto/create-ingredient.dto';
import { FillterIngredientDto } from 'src/api/ingredients/dto/fillter-ingredient.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  async getIngredient(
    filter: CreateIngredientDto,
  ): Promise<[any[], number, number, number]> {
    const { name, quantity, unitId, categoryId, storeId, exp } = filter;

    const queryName = await this.createQueryBuilder('ingredient')
      .select([
        'units.id',
        'categories.id',
        'stores.id',
        'ingredient.id',
        'ingredient.name',
        'ingredient.quantity',
        'ingredient.exp',
      ])
      .where('ingredient.name = :name', { name: name })
      .getRawOne();

    return queryName;
  }
}
