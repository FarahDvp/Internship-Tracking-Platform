import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageEteController } from './stage-ete.controller';
import { StageEteService } from './stage-ete.service';
import { StageEte } from './stageEte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StageEte])],
  controllers: [StageEteController],
  providers: [StageEteService],
  exports:[StageEteService]
})
export class StageEteModule {}
