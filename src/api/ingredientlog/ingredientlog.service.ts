import { Injectable } from '@nestjs/common';
import { CreateIngredientlogDto } from './dto/create-ingredientlog.dto';
import { UpdateIngredientlogDto } from './dto/update-ingredientlog.dto';

@Injectable()
export class IngredientlogService {
  create(createIngredientlogDto: CreateIngredientlogDto) {
    return 'This action adds a new ingredientlog';
  }

  findAll() {
    return `This action returns all ingredientlog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientlog`;
  }

  update(id: number, updateIngredientlogDto: UpdateIngredientlogDto) {
    return `This action updates a #${id} ingredientlog`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientlog`;
  }
}
