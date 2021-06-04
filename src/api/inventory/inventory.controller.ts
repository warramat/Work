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
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Response } from 'express';
import { resp } from 'src/shared/responses/response';
import { respError } from 'src/shared/responses/response-error';
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(
    @Body() createInventoryDto: CreateInventoryDto[],
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.inventoryService.create(
        createInventoryDto,
      );
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
      const responseData = await this.inventoryService.findAll();
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Get(':ingredient_id')
  async findOneById(
    @Param('ingredient_id', ParseIntPipe) ingredientId: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.inventoryService.findOneById(
        ingredientId,
      );
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
      const responseData = await this.inventoryService.delete(id);
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
