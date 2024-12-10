import { Cv } from "src/stage/entities/cv.entity";

export class EtudiantAlumanitoupdate {
    EtudiantAluId: any;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    formation: string[];
    poste: string;
    visibilite: Boolean;
    email: string;
    mdp: string;
    dateObtentionDiplome:Date;
    dateEmbacuhe:Date;
    vacation:Boolean;
    ContratExpert:Boolean;
    cv:Cv;
}