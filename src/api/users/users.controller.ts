import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { resp } from 'src/shared/responses/response';
import { respError } from 'src/shared/responses/response-error';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(
    @Body() body: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.userService.create(body);
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const responseData = await this.userService.findAll();
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.userService.findOne(id);
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.userService.update(id, body);

      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.userService.delete(id);
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
}
