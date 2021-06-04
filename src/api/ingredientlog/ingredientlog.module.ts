import { Module } from '@nestjs/common';
import { IngredientlogService } from './ingredientlog.service';
import { IngredientlogController } from './ingredientlog.controller';

@Module({
  controllers: [IngredientlogController],
  providers: [IngredientlogService]
})
export class IngredientlogModule {}
