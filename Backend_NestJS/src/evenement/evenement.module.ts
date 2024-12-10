import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { EvenementService } from './evenement.service';
import { Evenement } from './evenement.entity';
import { EvenementController } from './evenement.controller';
import { EtudiantModule } from 'src/etudiant/etudiant.module';


@Module({
  imports: [TypeOrmModule.forFeature([Evenement]), EtudiantModule ],
  providers: [EvenementService],
  controllers: [EvenementController],
  exports:[EvenementService]
})
export class EvenementModule {}
