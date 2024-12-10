import { ChangerMdpEnseignant } from './dtos/changemdp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enseignant } from './enseignant.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { MongoRepository, DeleteResult } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class EnseignantService {
  constructor(
    @InjectRepository(Enseignant)
    private enseignantRepository: MongoRepository<Enseignant>,
  ) {}
  async addEnseignant(enseignant: Enseignant): Promise<Enseignant> {
    return this.enseignantRepository.save(enseignant);
  }

  async getAllEnseignant(): Promise<Enseignant[]> {
    return this.enseignantRepository.find();
  }
  async getEnseignantById(id: string): Promise<Enseignant> {
    const enseignant: Enseignant = await this.enseignantRepository.findOneBy({
      idEnseignant: id,
    });
    console.log(enseignant, id);
    if (!enseignant) {
      throw new ForbiddenException('Error');
    } else {
      return enseignant;
    }
  }
  async deleteEnseignantById(id: string): Promise<DeleteResult> {
    const enseignant: Enseignant = await this.getEnseignantById(id);
    if (!enseignant) {
      throw new Error('Cannot Find User');
    } else {
      return await this.enseignantRepository.delete({ idEnseignant: id });
    }
  }

  async changerMdpEnseignant(
    changerMdpEnseignant: ChangerMdpEnseignant,
  ): Promise<Enseignant> {
    const enseignant: Enseignant = await this.getEnseignantById(
      changerMdpEnseignant.id,
    );
    if (!enseignant) {
      throw new ForbiddenException('Enseignant Not Found');
    }
    enseignant.mdp = await argon.hash(changerMdpEnseignant.mdp);
    return this.enseignantRepository.save(enseignant);
  }
}
// Il manque voir cv etudiants
// Voir et choisir pfe
