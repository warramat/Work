import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repositories/users.repository';
import { IngredientRepository } from 'src/database/repositories/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, IngredientRepository])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
