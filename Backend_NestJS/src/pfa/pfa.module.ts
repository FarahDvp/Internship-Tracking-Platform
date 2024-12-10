import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PfaController } from './pfa.controller';
import { PfaService } from './pfa.service';
import { Pfa } from './pfa.entity';
import { EtudiantActuelModule } from 'src/etudiant-actuel/etudiant-actuel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pfa]),EtudiantActuelModule],
  controllers: [PfaController],
  providers: [PfaService],
})
export class PfaModule {}
