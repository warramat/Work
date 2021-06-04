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
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { resp } from 'src/shared/responses/response';
import { respError } from 'src/shared/responses/response-error';
import { Response } from 'express';
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(
    @Body() body: CreateStoreDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.storeService.create(body);
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
      const responseData = await this.storeService.findAll();
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
      const responseData = await this.storeService.findOne(id);
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
    @Body() body: CreateStoreDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.storeService.update(id, body);

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
      const responseData = await this.storeService.delete(id);
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
