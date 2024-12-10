import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Cv {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn({unique:true})
  idCv: string;

  @Column()
  bio: string;

  @Column()
  location: string;

  @Column()
  linkedIn: string;

  @Column()
  diplome: string[];

  @Column()
  Competences: string[];

  @Column()
  formation:string[];

  @Column()
  experience:string[];

}
