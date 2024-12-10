import { Module } from '@nestjs/common';
import { EnseignantController } from './enseignant.controller';
import { EnseignantService } from './enseignant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enseignant } from './enseignant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enseignant])],
  controllers: [EnseignantController],
  providers: [EnseignantService],
})
export class EnseignantModule {}
