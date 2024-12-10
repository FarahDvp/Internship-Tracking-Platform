import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtudiantActuelService } from 'src/etudiant-actuel/etudiant-actuel.service';
import { EtudiantAlumniService } from 'src/etudiant-alumni/etudiant-alumni.service';
import { Repository } from 'typeorm';
import { Etudianttoupdate } from './etudiant.dto';
import { Etudiant } from './etudiant.entity';

@Injectable()
export class EtudiantService {
    constructor(
        @InjectRepository(Etudiant)
        private etudiantrepository: Repository<Etudiant>,
        private alumniservice: EtudiantAlumniService,
        private actuelservice: EtudiantActuelService,) { }

    async get() {
        const etudiantactuel = await this.actuelservice.get();
        const etudiantalu = await this.alumniservice.get();

   let all = [...etudiantactuel,...etudiantalu];
   return all;



    } async findOne(id: any): Promise<Etudiant> {

        const etudiantactuel = this.actuelservice.findOne(id);
        if (etudiantactuel) {
            return etudiantactuel;
        } else {
            const etudiantalumni = this.alumniservice.findOne(id);
            if (etudiantalumni) {
                return etudiantalumni;
            } else {
                throw new ForbiddenException('Not found');

            }

        }





    }
    async insertOne(Etudiant: Etudiant): Promise<Etudiant> {
        return await this.etudiantrepository.save(Etudiant);
    }
    /* async updateOne(Etudiant: Etudianttoupdate) {
         const toUpdate: Etudiant = await this.etudiantrepository.findOneBy({
             EtudiantId: Etudiant.id,
         });
         console.log(toUpdate);
         if (toUpdate) {
 
             return await this.etudiantrepository.save(toUpdate);
         } else {
             throw new ForbiddenException('Student not found .. !');
         }
     }
     async deleteOne(id: any) {
         const Etudiant: Etudiant = await this.findOne(id);
         if (Etudiant) {
             return this.etudiantrepository.delete({ EtudiantId: id });
         } else {
             throw new ForbiddenException('Error happened');
         }
     }*/
}
