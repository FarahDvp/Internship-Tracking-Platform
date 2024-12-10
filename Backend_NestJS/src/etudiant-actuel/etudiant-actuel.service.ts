import { EtudiantActuel } from './etudiantActuel.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { MongoRepository } from 'typeorm';
import { getManager, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { Etudiantacttoupdate } from './etudiantact.dto';
import { Cv } from 'src/stage/entities/cv.entity';
import { StageEteService } from 'src/stage-ete/stage-ete.service';
import { StageEte } from 'src/stage-ete/stageEte.entity';

@Injectable()
export class EtudiantActuelService {
  constructor(
    private mailingService: MailingService,
    @InjectRepository(EtudiantActuel)
    private etudiantrepository: Repository<EtudiantActuel>,
    private stageEteService: StageEteService
  ) { }
  async get() {
    return await this.etudiantrepository.find();
  }
  async findOne(id: string): Promise<EtudiantActuel> {
    const etudiant = this.etudiantrepository.findOneBy({
      EtudiantActId: id,
    });
    if (!etudiant) {
      throw new ForbiddenException('Not found');
    }
    return etudiant;
  }
  async findOneByLogin(id: string): Promise<EtudiantActuel> {
    const etudiants = await this.etudiantrepository.find();
    let etudiant = etudiants.find((etud) => {
      if (etud.login) { return etud.login.toString() == id.toString() }
      else return false })
    if (!etudiant) {
      throw new ForbiddenException('Not found');
    }
    return etudiant;
  }
  async insertOne(EtudiantActuel: EtudiantActuel): Promise<EtudiantActuel> {
    return await this.etudiantrepository.save(EtudiantActuel);
  }
  async updateOne(EtudiantActuel: Etudiantacttoupdate) {
    const toUpdate: EtudiantActuel = await this.etudiantrepository.findOneBy({
      EtudiantActId: EtudiantActuel.EtudiantActId,
    });
    console.log(toUpdate);
    if (toUpdate) {
      toUpdate.dateNaissance = EtudiantActuel.dateNaissance;
      toUpdate.nom = EtudiantActuel.nom;
      toUpdate.prenom = EtudiantActuel.prenom;
      toUpdate.pfa = EtudiantActuel.pfa;
      toUpdate.pfe = EtudiantActuel.pfe;
      toUpdate.login = EtudiantActuel.login;
      toUpdate.Classe = EtudiantActuel.Classe;
      toUpdate.stages = EtudiantActuel.stages;
      toUpdate.formation = EtudiantActuel.formation;
      toUpdate.email = EtudiantActuel.email;
      toUpdate.mdp = EtudiantActuel.mdp;
      toUpdate.poste = EtudiantActuel.poste;
      toUpdate.niveau = EtudiantActuel.niveau;
      toUpdate.visibilite = EtudiantActuel.visibilite;
      toUpdate.anneEtudet = EtudiantActuel.anneEtudet;
      return await this.etudiantrepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Student not found .. !');
    }
  }
  async deleteOne(id: any) {
    const Etudiant: EtudiantActuel = await this.findOne(id);
    if (Etudiant) {
      return this.etudiantrepository.delete({ EtudiantActId: id });
    } else {
      throw new ForbiddenException('Error happened');
    }
  }
  async addstage(id: string, stage: StageEte) {
    const etudiant = await this.findOne(id);
    if (!etudiant) {
      throw new Error("Verify student Id");
    } else if (etudiant) {
      etudiant.stages.push(stage);
      this.stageEteService.addStageEte(stage);
      //(await etudiant).login=1234512345;
      return this.updateOne(etudiant);

    }

  }
  async updatecv(id: string, cv: Cv) {
    const etudiant = await this.findOne(id);
    if (etudiant) {
      etudiant.cv.Competences = cv.Competences;
      etudiant.cv.experience = cv.experience;
      etudiant.cv.formation = cv.formation;
      return await this.updateOne(etudiant);
    } else {
      throw new ForbiddenException("Wrong Student Id ")
    }

  }
  //Partie Mailling , A ne pas modifier

  @Cron(new Date('October 15, 2023 08:30:00'))
  @Cron(new Date('July 15, 2023 08:30:00'))
  async sendDiplomaMails() {
    const etudiants: EtudiantActuel[] = await this.etudiantrepository.find();
    const etudiantSansDiplome = etudiants.filter(
      (etudiant) => etudiant.dateObtentionDiplome == null,
    );
    etudiantSansDiplome.map(
      async (e) =>
        await this.mailingService.sendEmailToAddDiploma(e.email, e.nom),
    );
  }
  @Cron('0 0 1 */6 *')
  async sendJobEmail() {
    const etudiants: Etudiant[] = await this.etudiantrepository.find();
    etudiants.map((e) => this.mailingService.sendEmailToAddJob(e.email, e.nom));
  }



  async update_cv(id: string, cv: Cv) {
    const etudiant = await this.findOne(id);
    if (etudiant) {

      etudiant.cv.bio = cv.bio;
      etudiant.cv.location = cv.location;
      etudiant.cv.linkedIn = cv.linkedIn;
      etudiant.cv.diplome = cv.diplome;
      etudiant.cv.Competences = cv.Competences;
      etudiant.cv.formation = cv.formation;
      etudiant.cv.experience = cv.experience;

      return await this.updateOne(etudiant);
    } else {
      throw new ForbiddenException("Wrong Student Id ")
    }

  }
}
