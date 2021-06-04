import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UsersModule } from './api/users/users.module';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './config/config.module';
import { IngredientsModule } from './api/ingredients/ingredients.module';
import { IngredientlogModule } from './api/ingredientlog/ingredientlog.module';
import { InventoryModule } from './api/inventory/inventory.module';
import { UnitModule } from './api/unit/unit.module';
import { CategoryModule } from './api/category/category.module';
import { StoreModule } from './api/store/store.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ApiModule,
    ConfigModule,
    IngredientsModule,
    IngredientlogModule,
    InventoryModule,
    UnitModule,
    CategoryModule,
    StoreModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
