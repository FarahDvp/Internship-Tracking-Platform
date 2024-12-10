import { LargeNumberLike } from "crypto";
import { Pfa } from "src/pfa/pfa.entity";
import { Pfe } from "src/pfe/pfe.entity";
import { StageEte } from "src/stage-ete/stageEte.entity";

export class Etudiantacttoupdate {
    _id:string;
    EtudiantActId: string;
    nom: string;
    prenom: string;
    niveau: string;
    Classe: string;
    dateNaissance: Date;
    formation: string[];
    poste: string;
    visibilite: Boolean;
    anneEtudet: Number;
    login:number;
    email: string;
    mdp: string;
    pfe:Pfe;
    pfa:Pfa;
    stages:StageEte[];
}