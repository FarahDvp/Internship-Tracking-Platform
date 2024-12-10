import { MongoRepository } from 'typeorm';
import { Injectable, ForbiddenException } from '@nestjs/common';

import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cvtoupdate } from './cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private CvRepository: MongoRepository<Cv>,
  ) { }
  create(createCv: Cv) {
    return this.CvRepository.save(createCv);
  }

  async findAll(): Promise<Cv[]> {
    return await this.CvRepository.find();
  }

  async findOne(id: string): Promise<Cv> {
     return await this.CvRepository.findOneBy({ idCv: id });
  }



  /* async update(id: string, updateCvDto: Cv): Promise<Cv> {
    let Cvtoupdate = await this.findOne(id);
    Cvtoupdate = updateCvDto;
    return await this.CvRepository.save(Cvtoupdate);
  } */
  async update(Cv: Cvtoupdate) {
    const toUpdate: Cv = await this.CvRepository.findOneBy({
      idCv: Cv.idCv,
    });
    console.log(toUpdate);
    if (toUpdate) {
      toUpdate.bio = Cv.bio;
      toUpdate.location = Cv.location;
      toUpdate.linkedIn = Cv.linkedIn;
      toUpdate.diplome = Cv.diplome;
      toUpdate.Competences = Cv.Competences;
      toUpdate.formation = Cv.formation;
      toUpdate.experience = Cv.experience;
      return await this.CvRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Cv not found .. !');
    }
  }

  async remove(id: string) {
    const Cvtodelete = await this.findOne(id);
    if (Cvtodelete) {
      return await this.CvRepository.delete({ idCv: id });
    } else {
      throw new ForbiddenException('Impossible to delete this ... ! ');
    }
  }
}
