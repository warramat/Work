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
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Response } from 'express';
import { resp } from 'src/shared/responses/response';
import { respError } from 'src/shared/responses/response-error';
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  async create(
    @Body() body: CreateUnitDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.unitService.create(body);
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
      const responseData = await this.unitService.findAll();
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
      const responseData = await this.unitService.findOne(id);
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
    @Body() body: CreateUnitDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.unitService.update(id, body);

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
      const responseData = await this.unitService.delete(id);
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
