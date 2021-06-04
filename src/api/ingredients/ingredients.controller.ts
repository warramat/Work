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
  Query,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Response } from 'express';
import { resp } from 'src/shared/responses/response';
import { respError } from 'src/shared/responses/response-error';
import { DeleteManyProductDto } from './dto/delete-many-product.dto';
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}
  @Get('getIngredient')
  async getIngredient(
    @Query() filter: CreateIngredientDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.ingredientsService.getIngredient(filter);
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto[],
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.ingredientsService.create(
        createIngredientDto,
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
      const responseData = await this.ingredientsService.findAll();
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
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.ingredientsService.findOneById(id);
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CreateIngredientDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.ingredientsService.update(id, body);
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
      const responseData = await this.ingredientsService.delete(id);
      return resp(res, HttpStatus.OK, responseData);
    } catch (error) {
      return respError(
        res,
        error.status ? error.status : HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
  @Delete()
  async deleteManyProduct(
    @Body() deleteManyProductDto: DeleteManyProductDto[],
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const responseData = await this.ingredientsService.deleteMenyProduct(
        deleteManyProductDto,
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
}
