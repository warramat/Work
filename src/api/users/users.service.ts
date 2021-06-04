import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from 'src/database/entities/user.entity';
import { UserRepository } from 'src/database/repositories/users.repository';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(body: CreateUserDto): Promise<IResponse> {
    try {
      const { username, password, email } = body;

      const findUser = await this.userRepository.findOne({
        where: { username: username, deletedAt: null },
      });

      if (findUser) {
        throw new BadRequestException('duplicate user.');
      }

      const user = new User();
      user.username = username;
      user.password = password;
      user.email = email;

      await user.save();

      return {
        success: true,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IResponse> {
    const users = await this.userRepository.find();

    const plainData = plainToClass(User, users, { groups: ['user_show'] });
    return {
      success: true,
      data: plainData,
    };
  }

  async findOne(id: number): Promise<IResponse> {
    const findUser = await this.userRepository.findOne({
      where: { id: id, deletedAt: null },
    });

    if (!findUser) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }
    const plainData = plainToClass(User, findUser, { groups: ['user_show'] });

    return { success: true, data: plainData };
  }

  async update(id: number, body: UpdateUserDto): Promise<IResponse> {
    try {
      const { username, email } = body;

      const findUser = await this.userRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findUser) {
        throw new BadRequestException('ไม่พบผู้ใช้');
      }

      findUser.username = username;
      findUser.email = email;

      await findUser.save();

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
      const findUser = await this.userRepository.findOne({
        where: { id: id, deletedAt: null },
      });

      if (!findUser) {
        throw new BadRequestException(`ไม่พบผู้ใช้`);
      }

      // findUser.isDelete = true;
      findUser.deletedAt = new Date();
      await findUser.save();

      return {
        success: true,
        message: 'ลบผู้ใช้สำเร็จ.',
      };
    } catch (error) {
      throw error;
    }
  }
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    return user;
  }
}
