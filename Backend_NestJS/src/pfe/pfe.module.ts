import { Module } from '@nestjs/common';
import { PfeService } from './pfe.service';
import { PfeController } from './pfe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pfe } from './pfe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pfe])],
  providers: [PfeService],
  controllers: [PfeController]
})
export class PfeModule {}
