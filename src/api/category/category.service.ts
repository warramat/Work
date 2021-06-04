import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Category } from 'src/database/entities/category.entity';
import { CategoryRepository } from 'src/database/repositories/category.repository';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(body: CreateCategoryDto): Promise<IResponse> {
    try {
      const { name } = body;

      const findCategory = await this.categoryRepository.findOne({
        where: { name: name, deletedAt: null },
      });

      if (findCategory) {
        throw new BadRequestException('คุณได้สร้างรายการนี้แล้ว.');
      }

      const category = new Category();
      category.name = name;

      await category.save();

      return {
        success: true,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IResponse> {
    const category = await this.categoryRepository.find();

    const plainData = plainToClass(Category, category, {
      groups: ['category_show'],
    });
    return {
      success: true,
      data: plainData,
    };
  }

  async findOne(id: number): Promise<IResponse> {
    const findCategory = await this.categoryRepository.findOne({
      where: { id: id, deletedAt: null },
    });

    if (!findCategory) {
      throw new NotFoundException('ไม่พบประเภทวัตถุดิบที่ต้องการ');
    }
    const plainData = plainToClass(Category, findCategory, {
      groups: ['category_show'],
    });

    return { success: true, data: plainData };
  }

  async update(id: number, body: CreateCategoryDto): Promise<IResponse> {
    try {
      const { name } = body;

      const findCategory = await this.categoryRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findCategory) {
        throw new BadRequestException('ไม่พบประเภทวัตถุดิบที่ต้องการ');
      }

      findCategory.name = name;

      await findCategory.save();

      return {
        success: true,
        message: 'update success',
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<IResponse> {
    try {
      const findCategory = await this.categoryRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findCategory) {
        throw new BadRequestException(`ไม่พบประเภทวัตถุดิบที่ต้องการ`);
      }

      findCategory.isDelete = true;
      findCategory.deletedAt = new Date();
      await findCategory.save();

      return {
        success: true,
        message: 'ลบสำเร็จ.',
      };
    } catch (error) {
      throw error;
    }
  }
}
