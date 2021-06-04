import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Ingredient } from 'src/database/entities/ingredient.entity';
import { IngredientRepository } from 'src/database/repositories/ingredient.repository';
import { UserRepository } from 'src/database/repositories/users.repository';
import { IPayload } from 'src/shared/interfaces/payload.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { getConnection } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { DeleteManyProductDto } from './dto/delete-many-product.dto';
import { FillterIngredientDto } from './dto/fillter-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly ingredientRepository: IngredientRepository,
  ) {}
  async create(createIngredientDto: CreateIngredientDto[]): Promise<IResponse> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const body of createIngredientDto) {
        const {
          name,
          quantity,
          unitId,
          categoryId,
          storeId,
          exp,

          // ownerProduct,
        } = body;

        // const findUser = await this.userRepository.findOne({
        //   where: { id: ownerProduct },
        // });

        // if (!findUser) {
        //   throw new BadRequestException('ไม่พบผู้ใช้.');
        // }

        const ingredient = new Ingredient();
        // ingredient.user = findUser;
        ingredient.name = name;
        ingredient.quantity = quantity;
        ingredient.units = unitId;
        ingredient.categories = categoryId;
        ingredient.stores = storeId;
        ingredient.exp = exp;

        await queryRunner.manager.save(ingredient);
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        success: true,
        message: 'created success.',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findAll(): Promise<IResponse> {
    const ingredients = await this.ingredientRepository.find({
      relations: ['units', 'categories', 'stores'],
    });

    const plainData = plainToClass(Ingredient, ingredients, {
      groups: ['ingredient_show'],
    });
    return {
      success: true,
      data: plainData,
    };
  }

  async findOneById(id: number): Promise<IResponse> {
    const findIngredient = await this.ingredientRepository.findOne({
      where: { id: id },
      relations: ['units', 'categories', 'stores'],
    });

    if (!findIngredient) {
      throw new NotFoundException('Ingredient not found.');
    }

    const plainData = plainToClass(Ingredient, findIngredient, {
      groups: ['ingredient_show'],
    });

    return { success: true, data: plainData };
  }

  async update(id: number, body: CreateIngredientDto): Promise<IResponse> {
    try {
      const find = await this.ingredientRepository.findOne({
        where: { id: id },
      });
      const {
        name,
        quantity,
        unitId,
        categoryId,
        storeId,
        exp,

        // ownerProduct,
      } = body;

      // const findUser = await this.userRepository.findOne({
      //   where: { id: ownerProduct },
      // });

      // if (!findUser) {
      //   throw new BadRequestException('ไม่พบผู้ใช้.');
      // }

      if (!find) {
        throw new BadRequestException('Ingredient not found.');
      }

      find.name = name;
      find.quantity = quantity;
      find.units = unitId;
      find.categories = categoryId;
      find.stores = storeId;
      find.exp = exp;

      // find.user = findUser;
      await find.save();

      return {
        success: true,
        message: 'updated success.',
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<IResponse> {
    try {
      const findIngredient = await this.ingredientRepository.findOne({
        where: { id: id },
      });

      if (!findIngredient) {
        throw new BadRequestException(`Ingredient not found.`);
      }

      findIngredient.isDelete = true;
      findIngredient.deletedAt = new Date();
      await findIngredient.save();

      return {
        success: true,
        message: 'ลบสำเร็จ.',
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteMenyProduct(
    deleteManyProductDto: DeleteManyProductDto[],
  ): Promise<IResponse> {
    try {
      for (const ingredient of deleteManyProductDto) {
        await getConnection()
          .createQueryBuilder()
          .update(Ingredient)
          .set({
            isDelete: true,
            deletedAt: new Date(),
          })
          .where('id = :id', { id: ingredient.id })
          .execute();
      }

      return {
        success: true,
        message: `delete success`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getIngredient(
    ingredientFilterDto: CreateIngredientDto,
  ): Promise<IResponse> {
    try {
      const find = await this.ingredientRepository.getIngredient(
        ingredientFilterDto,
      );
      return {
        success: true,
        data: find,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
