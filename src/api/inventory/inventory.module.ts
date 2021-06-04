import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientRepository } from 'src/database/repositories/ingredient.repository';
import { InventoryRepository } from 'src/database/repositories/inventory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientRepository, InventoryRepository]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
