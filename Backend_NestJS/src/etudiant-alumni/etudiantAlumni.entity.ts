import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantAlumni extends Etudiant {
  @PrimaryColumn({
    name: 'EtudiantAluId',
    unique : true
  })
  EtudiantAluId: string;
  @Column()
  dateObtentionDiplome: Date;
  @Column()
  dateEmbacuhe: Date;
  @Column()
  vacation: Boolean;
  @Column()
  ContratExpert: Boolean;
}
