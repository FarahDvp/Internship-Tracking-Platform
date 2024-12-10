import { Pfa } from 'src/pfa/pfa.entity';
import { Pfe } from 'src/pfe/pfe.entity';
import { StageEte } from 'src/stage-ete/stageEte.entity';
import { Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantActuel extends Etudiant {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn({
    name: 'EtudiantActId',
    unique: true
  })
  EtudiantActId: string;
  @Column()
  niveau: string;
  @Column()
  Classe: string;
  @Column()
  anneEtudet: Number;
  @Column()
  pfa: Pfa;
  @Column()
  pfe: Pfe;
  @Column()
  dateObtentionDiplome: Date = null;
  @Column()
  stages: StageEte[];

}
