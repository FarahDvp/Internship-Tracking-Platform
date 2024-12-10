import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsableController } from './responsable.controller';
import { Responsable } from './responsable.entity';
import { ResponsableService } from './responsable.service';

@Module({
  imports: [TypeOrmModule.forFeature([Responsable])],
  controllers: [ResponsableController],
  providers: [ResponsableService]
})
export class ResponsableModule {}
