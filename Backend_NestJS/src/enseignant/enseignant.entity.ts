import { Role } from 'src/auth/Roles';
import { User } from 'src/user/user.entity';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Enseignant extends User {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  idEnseignant: string;
  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column('string', { default: Role.Enseignant })
  roles: Role[];
}
// il manque idResponsable
//choisir pfe , il faut que la liste pfe soit complete
