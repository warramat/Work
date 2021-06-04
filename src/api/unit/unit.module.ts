import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { UnitRepository } from 'src/database/repositories/unit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UnitRepository])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
