import { Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StageEte {
  @ObjectIdColumn()
  _id:string;
  @PrimaryColumn()
  idStage: number;
  @Column()
  sujet: string;
  @Column()
  dateDebut:Date;
  @Column()
  dateFin:Date;
  @Column()
  societe:string;
}
