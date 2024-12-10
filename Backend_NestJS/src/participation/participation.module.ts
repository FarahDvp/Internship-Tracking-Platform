import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { EtudiantModule } from 'src/etudiant/etudiant.module';
import { EvenementModule } from 'src/evenement/evenement.module';
import { ParticipationController } from './participation.controller';
import { Participation } from './participation.entity';
import { ParticipationService } from './participation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participation]),EtudiantModule , EvenementModule ],
  controllers: [ParticipationController],
  providers: [ParticipationService]
})
export class ParticipationModule {}
