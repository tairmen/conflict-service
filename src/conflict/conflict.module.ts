import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConflictService } from './conflict.service';
import { ConflictController } from './conflict.controller';
import { Conflict } from '../entities/conflict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conflict])],
  providers: [ConflictService],
  controllers: [ConflictController],
})
export class ConflictModule {}
