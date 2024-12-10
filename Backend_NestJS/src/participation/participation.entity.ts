import { Entity, Column, ObjectIdColumn, PrimaryColumn } from 'typeorm';


@Entity()
export class Participation {

  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn({ unique: true })
  idParticipation: string;

  @Column()
  idEtudiant: number;

  @Column()
  idEvenement: string;

  @Column()
  dateParticipation: Date;

  @Column()
  validite: boolean;

}
