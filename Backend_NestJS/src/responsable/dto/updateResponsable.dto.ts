import { Role } from 'src/auth/Roles';
export class UpdateResponsableDto {
  idResponsable: string;

  nom: string;

  prenom: string;

  roles: Role[];

  email: string;
}
