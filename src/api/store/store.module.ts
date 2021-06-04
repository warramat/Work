import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from 'src/database/repositories/store.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreRepository])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
