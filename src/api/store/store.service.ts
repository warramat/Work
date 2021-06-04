import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Store } from 'src/database/entities/store.entity';
import { StoreRepository } from 'src/database/repositories/store.repository';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}
  async create(body: CreateStoreDto): Promise<IResponse> {
    try {
      const { name } = body;

      const findStore = await this.storeRepository.findOne({
        where: { name: name, deletedAt: null },
      });

      if (findStore) {
        throw new BadRequestException('คุณได้สร้างรายการนี้แล้ว.');
      }

      const store = new Store();
      store.name = name;

      await store.save();

      return {
        success: true,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IResponse> {
    const store = await this.storeRepository.find();

    const plainData = plainToClass(Store, store, {
      groups: ['store_show'],
    });
    return {
      success: true,
      data: plainData,
    };
  }

  async findOne(id: number): Promise<IResponse> {
    const findStore = await this.storeRepository.findOne({
      where: { id: id, deletedAt: null },
    });

    if (!findStore) {
      throw new NotFoundException('ไม่พบที่เก็บวัตถุดิบที่ต้องการ');
    }
    const plainData = plainToClass(Store, findStore, {
      groups: ['store_show'],
    });

    return { success: true, data: plainData };
  }

  async update(id: number, body: CreateStoreDto): Promise<IResponse> {
    try {
      const { name } = body;

      const findStore = await this.storeRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findStore) {
        throw new BadRequestException('ไม่พบที่เก็บวัตถุดิบที่ต้องการ');
      }

      findStore.name = name;

      await findStore.save();

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
      const findStore = await this.storeRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findStore) {
        throw new BadRequestException(`ไม่พบที่เก็บวัตถุดิบที่ต้องการ`);
      }

      findStore.isDelete = true;
      findStore.deletedAt = new Date();
      await findStore.save();

      return {
        success: true,
        message: 'ลบสำเร็จ.',
      };
    } catch (error) {
      throw error;
    }
  }
}
