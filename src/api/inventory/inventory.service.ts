import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Inventory } from 'src/database/entities/inventory.entity';
import { IngredientRepository } from 'src/database/repositories/ingredient.repository';
import { InventoryRepository } from 'src/database/repositories/inventory.repository';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { getConnection } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly ingredientRepository: IngredientRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}
  async create(createInventoryDto: CreateInventoryDto[]): Promise<IResponse> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const body of createInventoryDto) {
        const { quantity, ingredientId } = body;
        const findProduct = await this.ingredientRepository.findOne({
          where: { id: ingredientId },
        });

        if (!findProduct) {
          throw new BadRequestException('Ingredient not found.');
        }

        if (quantity * -1 > findProduct.quantity) {
          throw new BadRequestException(`Ingredient not enough`);
        }

        const sum = Number(findProduct.quantity) + quantity;

        const inventory = new Inventory();
        inventory.quantity = quantity;
        inventory.ingredient = findProduct;

        await queryRunner.manager.save(inventory);

        findProduct.quantity = sum;
        await queryRunner.manager.save(findProduct);
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        success: true,
        message: 'success',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findAll(): Promise<IResponse> {
    const inventory = await this.inventoryRepository.find({
      relations: ['ingredient'],
    });

    const plainData = plainToClass(Inventory, inventory, {
      groups: ['inventory_show'],
    });

    return {
      success: true,
      data: plainData,
    };
  }

  async findOneById(ingredientId: number): Promise<IResponse> {
    const findProduct = await this.ingredientRepository.findOne({
      where: { id: ingredientId },
    });

    if (!findProduct) {
      throw new BadRequestException('Ingredient not found.');
    }
    const inventory = await this.inventoryRepository.find({
      where: {
        ingredient: ingredientId,
      },
      relations: ['ingredient'],
    });

    const plainData = plainToClass(Inventory, inventory, {
      groups: ['inventory_show'],
    });

    return {
      success: true,
      data: plainData,
    };
  }
  async findOneByIdOut(ingredientId: number): Promise<IResponse> {
    const findProduct = await this.ingredientRepository.findOne({
      where: { id: ingredientId },
    });

    if (!findProduct) {
      throw new BadRequestException('Ingredient not found.');
    }
    const inventory = await this.inventoryRepository.sumQuantitiesOut;

    const plainData = plainToClass(Inventory, inventory, {
      groups: ['inventory_show'],
    });

    return {
      success: true,
      data: plainData,
    };
  }
  async delete(id: number): Promise<IResponse> {
    try {
      const findInventory = await this.inventoryRepository.findOne({
        where: { id: id },
      });

      if (!findInventory) {
        throw new BadRequestException(`Ingredient not found.`);
      }

      findInventory.isDelete = true;
      findInventory.deletedAt = new Date();
      await findInventory.save();

      return {
        success: true,
        message: 'delete success.',
      };
    } catch (error) {
      throw error;
    }
  }
}
