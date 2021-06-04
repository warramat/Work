import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientlogService } from './ingredientlog.service';
import { CreateIngredientlogDto } from './dto/create-ingredientlog.dto';
import { UpdateIngredientlogDto } from './dto/update-ingredientlog.dto';

@Controller('ingredientlog')
export class IngredientlogController {
  constructor(private readonly ingredientlogService: IngredientlogService) {}

  @Post()
  create(@Body() createIngredientlogDto: CreateIngredientlogDto) {
    return this.ingredientlogService.create(createIngredientlogDto);
  }

  @Get()
  findAll() {
    return this.ingredientlogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientlogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientlogDto: UpdateIngredientlogDto) {
    return this.ingredientlogService.update(+id, updateIngredientlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientlogService.remove(+id);
  }
}
