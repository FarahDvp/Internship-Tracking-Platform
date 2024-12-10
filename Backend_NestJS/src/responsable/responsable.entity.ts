import { Role } from 'src/auth/Roles';
import { Roles } from './../auth/decorators/roles/roles.decorator';
import { User } from 'src/user/user.entity';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Responsable extends User {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn({ unique: true })
  idResponsable: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  roles: Role[];
}
