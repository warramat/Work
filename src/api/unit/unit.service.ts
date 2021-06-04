import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Unit } from 'src/database/entities/unit.entity';
import { UnitRepository } from 'src/database/repositories/unit.repository';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(private readonly unitRepository: UnitRepository) {}

  async create(body: CreateUnitDto): Promise<IResponse> {
    try {
      const { name } = body;

      const findUser = await this.unitRepository.findOne({
        where: { name: name, deletedAt: null },
      });

      if (findUser) {
        throw new BadRequestException('คุณได้สร้างรายการนี้แล้ว.');
      }

      const unit = new Unit();
      unit.name = name;

      await unit.save();

      return {
        success: true,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IResponse> {
    const unit = await this.unitRepository.find();

    const plainData = plainToClass(Unit, unit, { groups: ['unit_show'] });
    return {
      success: true,
      data: plainData,
    };
  }

  async findOne(id: number): Promise<IResponse> {
    const findUnit = await this.unitRepository.findOne({
      where: { id: id, deletedAt: null },
    });

    if (!findUnit) {
      throw new NotFoundException('ไม่พบหน่วยที่ต้องการ');
    }
    const plainData = plainToClass(Unit, findUnit, { groups: ['unit_show'] });

    return { success: true, data: plainData };
  }

  async update(id: number, body: UpdateUnitDto): Promise<IResponse> {
    try {
      const { name } = body;

      const findUnit = await this.unitRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findUnit) {
        throw new BadRequestException('ไม่พบ');
      }

      findUnit.name = name;

      await findUnit.save();

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
      const findUnit = await this.unitRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findUnit) {
        throw new BadRequestException(`ไม่พบหน่วยที่ต้องการ`);
      }

      findUnit.isDelete = true;
      findUnit.deletedAt = new Date();
      await findUnit.save();

      return {
        success: true,
        message: 'ลบสำเร็จ.',
      };
    } catch (error) {
      throw error;
    }
  }
}
