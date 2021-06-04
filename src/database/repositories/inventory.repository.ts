import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  async getInventoryById(id: number): Promise<Inventory> {
    try {
      const queryData = await this.findOne({
        where: { id: id },
        relations: ['ingredient'],
      });
      return queryData;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(error.message);
    }
  }
  async sumQuantityByWarehouse(ingredientId: number) {
    const sum = await this.createQueryBuilder()
      .select(['SUM(quantity)'])
      .where('ingredient_id = :ingredientId', { ingredientId: ingredientId })
      .getRawOne();

    return sum;
  }
  async sumQuantity(ingredientId: number) {
    const sum = await this.createQueryBuilder()
      .select(['SUM(quantity)'])
      .andWhere('ingredient_id = :ingredientId', { ingredientId: ingredientId })
      .getRawOne();

    return sum;
  }
  async sumQuantitiesOut(ingredientId: number, quantity: number) {
    const sum = await this.createQueryBuilder()
      .select(['SUM(quantity)'])
      .where('ingredient_id = :ingredientId', { ingredientId: ingredientId })
      .andWhere('quantity<=:quantity', { quantity: 0 })
      .getRawOne();

    return sum;
  }
}
