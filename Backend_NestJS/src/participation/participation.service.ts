import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { Evenement } from 'src/evenement/evenement.entity';
import { EvenementService } from 'src/evenement/evenement.service';
import { MongoRepository, Repository } from 'typeorm';
import { AddParticipationDto } from './dto/addparticipation.dto';
import { Valider } from './dto/valider.dto';
import { Participation } from './participation.entity';

@Injectable()
export class ParticipationService {

    constructor(
        private etudiantService:EtudiantService,
        private evenementService:EvenementService,
        @InjectRepository(Participation) 
        private participationRepository: Repository<Participation>
    ) {}

    async getAll(): Promise<Participation[]> {
        return this.participationRepository.find();
    }

    async getParticipationById(id: string): Promise<Participation> {
        const participation: Participation = await this.participationRepository.findOneBy({
          idParticipation: id,
        });
        console.log(participation, id);
        if (!participation) {
          throw new ForbiddenException('Error');
        } else {
          return participation;
        }
    }

    async addParticipation(participation:Participation): Promise<Participation> {
        const evenement : Evenement = await this.evenementService.findEvenementById(participation.idEvenement);
        const etudiant : Etudiant = await this.etudiantService.findOne(participation.idEtudiant);
        if (!evenement){
          throw new NotFoundException('Evenement Doesnt Exist');
        }
        else{

          if (!etudiant){
            throw new NotFoundException('Etudiant Doesnt Exist');
          }
          else{
            participation.validite=false;
            const date = new Date();
            participation.dateParticipation= date;
            return await this.participationRepository.save(participation);
          }
        }    
    }

    async deleteParticipation(id: string): Promise<Participation> {
        const participation: Participation = await this.participationRepository.findOneBy({ idParticipation: id });
        if (!participation) {
            throw new NotFoundException('Error');
        } else {
            await this.participationRepository.delete({ idParticipation: id });
            return participation;
        }
    }

    async updateParticipation(addParticipationDto: AddParticipationDto): Promise<Participation> {
        const toUpdate: Participation = await this.participationRepository.findOneBy({
          idParticipation: addParticipationDto.idParticipation,
        });
        if (toUpdate) {
          toUpdate.idEtudiant = addParticipationDto.idEtudiant;
          toUpdate.idEvenement = addParticipationDto.idEvenement;
          return await this.participationRepository.save(toUpdate);
        } else {
          throw new ForbiddenException('Participation not found .. !');
        }
      }

    async validateParticipation(valider : Valider): Promise<Participation> {
        const participation = await this.participationRepository.findOneBy({ idEtudiant : valider.idEtudiant , idEvenement : valider.idEvenement });
        participation.validite = true;
        return this.participationRepository.save(participation);
        }
        

}
