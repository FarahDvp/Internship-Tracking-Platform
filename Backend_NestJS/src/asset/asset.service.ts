import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const { Readable } = require('stream');
import { Repository } from 'typeorm';
import { parse } from 'papaparse';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';


@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(EtudiantActuel)
        private etudiantrepository: Repository<EtudiantActuel>) { }

    create(file: Express.Multer.File) {
        const stream = Readable.from(file.buffer);
        let etudiantact = new Array<EtudiantActuel>;
        var i = 0;
        const csvData = parse(stream, {
            header: false,
            worker: true,
            dynamicTyping: true,
            delimiter: ";",
            step: function (row) {
                const etudiant = new EtudiantActuel();
                if (i > 0) {
                    var j = 0;
                    etudiant.nom = row.data[j];
                    etudiant.prenom = row.data[j + 1];
                    etudiant.dateNaissance = row.data[j + 2];
                    etudiant.formation = row.data[j + 3];
                    etudiant.poste = row.data[j + 4];
                    etudiant.visibilite = row.data[j + 5];
                    etudiant.niveau = row.data[j + 6];
                    etudiant.Classe = row.data[j + 7];
                    etudiant.anneEtudet = row.data[j + 8];
                    etudiant.login = row.data[j + 9];
                    etudiant.mdp = row.data[j + 10];
                    etudiant.email = row.data[j + 11]
                    etudiant.EtudiantActId = row.data[j + 12].toString();
                    etudiant.pfa = null;
                    etudiant.pfe = null;
                    etudiant.stages = [];
                    etudiant.cv = null;



                }
                i++;

                console.log("hala madrid");
                etudiantact.push(etudiant);

            },


        });
        setTimeout(async () => {
            for (var k = 0; k < etudiantact.length; k++) {
                const test = await this.etudiantrepository.findOneBy({
                    EtudiantActId: etudiantact[k].EtudiantActId
                })
                if (test) {
                    test.dateNaissance = etudiantact[k].dateNaissance;
                    test.nom = etudiantact[k].nom;
                    test.prenom = etudiantact[k].prenom;
                    test.login = etudiantact[k].login;
                    test.Classe = etudiantact[k].Classe;
                    test.stages = etudiantact[k].stages;
                    test.formation = etudiantact[k].formation;
                    test.email = etudiantact[k].email;
                    test.mdp = etudiantact[k].mdp;
                    test.poste = etudiantact[k].poste;
                    test.niveau = etudiantact[k].niveau;
                    test.visibilite = etudiantact[k].visibilite;
                    test.anneEtudet = etudiantact[k].anneEtudet;
                    this.etudiantrepository.save(test);

                } else {
                    this.etudiantrepository.save(
                        this.etudiantrepository.create(etudiantact[k])
                    );
                }

            }

        }, 1000);
    }
}
