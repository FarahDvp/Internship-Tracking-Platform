import { Role } from './../auth/Roles';
import { Column, Entity, ObjectID, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Cv } from 'src/stage/entities/cv.entity';

@Entity()
export class Etudiant extends User {
 /* @PrimaryColumn({
    name: 'EtudiantId',
    unique: true
  })
  EtudiantId: string;*/
  
  @Column()
  nom: string;
  @Column()
  prenom: string;
  @Column()
  dateNaissance: Date;
  @Column()
  formation: string[];
  @Column()
  poste: string;
  @Column({nullable:true})
  visibilite: Boolean;
  @Column()
  cv: Cv;
  // @Column()
  //alumni: Boolean;

  @Column()
  roles: Role[];
}
