import { Column, Entity ,PrimaryColumn,ObjectIdColumn } from 'typeorm';

@Entity()
export class Evenement {

  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn({ unique: true })
  idEvenement: string;

  @Column()
  nom: string;

  @Column()
  dateEvenement: Date;

}



