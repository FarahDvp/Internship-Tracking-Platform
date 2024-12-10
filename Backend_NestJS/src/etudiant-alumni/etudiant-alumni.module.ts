import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtudiantAlumniController } from './etudiant-alumni.controller';
import { EtudiantAlumniService } from './etudiant-alumni.service';
import { EtudiantAlumni } from './etudiantAlumni.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EtudiantAlumni])],
  controllers: [EtudiantAlumniController],
  providers: [EtudiantAlumniService],
  exports:[EtudiantAlumniService]
})
export class EtudiantAlumniModule {
  

  }
  


