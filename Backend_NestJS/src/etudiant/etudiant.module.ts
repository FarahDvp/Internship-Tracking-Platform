import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from './etudiant.entity';
import { EtudiantActuelModule } from 'src/etudiant-actuel/etudiant-actuel.module';
import { EtudiantAlumniModule } from 'src/etudiant-alumni/etudiant-alumni.module';


@Module({
  imports:[TypeOrmModule.forFeature([Etudiant]),EtudiantActuelModule,EtudiantAlumniModule],
  providers: [EtudiantService],
  controllers: [EtudiantController],
  exports:[EtudiantService]
})
export class EtudiantModule {}
