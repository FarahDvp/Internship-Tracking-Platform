import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from 'src/stage/entities/cv.entity';
import { Repository } from 'typeorm';
import { EtudiantAlumanitoupdate } from './etudiantalu.dto';
import { EtudiantAlumni } from './etudiantAlumni.entity';

@Injectable()
export class EtudiantAlumniService {
    constructor(
        @InjectRepository(EtudiantAlumni)
        private etudiantrepository: Repository<EtudiantAlumni>) { }
    async get() {
        return await this.etudiantrepository.find();
    }
    async findOne(id: string): Promise<EtudiantAlumni> {
        const etudiant = this.etudiantrepository.findOneBy({
            EtudiantAluId: id,
        })
        if (!etudiant) {
            throw new ForbiddenException('Not found');
        }
        return etudiant;
    }
    async insertOne(EtudiantAlumni: EtudiantAlumni): Promise<EtudiantAlumni> {
        return await this.etudiantrepository.save(EtudiantAlumni);
    }
    async updateOne(EtudiantAlumni: EtudiantAlumanitoupdate) {
        const toUpdate: EtudiantAlumni = await this.etudiantrepository.findOneBy({
            EtudiantAluId: EtudiantAlumni.EtudiantAluId,
        });
        console.log(toUpdate);
        if (toUpdate) {

            return await this.etudiantrepository.save(EtudiantAlumni);
        } else {
            throw new ForbiddenException('Student not found .. !');
        }
    }
    async deleteOne(id: any) {
        const Etudiant: EtudiantAlumni = await this.findOne(id);
        if (Etudiant) {
            return this.etudiantrepository.delete({ EtudiantAluId: id });
        } else {
            throw new ForbiddenException('Error happened');
        }
    }
    async stats() {
        const all = await this.get();
        const DateObtention: any = [];
        var counting = 0;

        const all_etudiants = (await all).reduce((all_etudiants: { [key: string]: any }, item) => {
            const etudiant = all_etudiants[new Date(item.dateObtentionDiplome).getFullYear()] || [];
            etudiant.push(item);
            all_etudiants[new Date(item.dateObtentionDiplome).getFullYear()] = etudiant;
            return all_etudiants;
        }, {});
        Object.keys(all_etudiants).map((etudiant) => {
            counting = 0;
            var y;
            const value = all_etudiants[etudiant];
            value.map((d: any) => {
                console.log(etudiant);
                y = new Date(d.dateObtentionDiplome).getFullYear();
                if (new Date(d.dateObtentionDiplome).getFullYear().toString() == etudiant) {

                    counting++;
                }
            }),
                DateObtention.push({
                    DateObtention: etudiant,
                    etudiant: counting,
                })
        })
        console.log(DateObtention);
        return DateObtention



    }
    async chomage() {
        const all = await this.get();
        var days = 0;
        var count = 0;
        all.map((etudiant) => {
            var diff = 0;


            if (etudiant.dateEmbacuhe !== null || etudiant.dateEmbacuhe !== undefined) {
                count++;
                diff = new Date(etudiant.dateEmbacuhe).getTime() - new Date(etudiant.dateObtentionDiplome).getTime();
                days = days + diff;
            }
        })
        const day_diff = days / (1000 * 60 * 60 * 24)/count;
        console.log(count);

        return "the average time waiting for the first job is (for people the "+count+" who got a job) is :" + day_diff+ " In days ";

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

}