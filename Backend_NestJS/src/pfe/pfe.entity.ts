import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
@Entity()
export class Pfe {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  idpfe: string;
  @Column()
  type: string;

  @Column()
  societe: string;

  @Column()
  pays: string;

  @Column()
  idEnseignant: string;

  @Column()
  sujet: string;
}
