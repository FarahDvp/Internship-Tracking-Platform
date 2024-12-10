import { Injectable,ForbiddenException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { MongoRepository } from 'typeorm';
import { UpdatePublicationDto } from './dto/updatePublication.dto';

@Injectable()
export class PublicationService {
  constructor(
      @InjectRepository(Publication) 
      private publicationRepository: MongoRepository<Publication>,
  ) {}

  async addPublication(publication: Publication): Promise<Publication> {
      return this.publicationRepository.save(publication);
  }

  async getAll(): Promise<Publication[]> {
      return this.publicationRepository.find();
  }

  async getPublicationById(id: string): Promise<Publication> {
      const publication: Publication = await this.publicationRepository.findOneBy({
        idPublication: id,
      });
      console.log(publication, id);
      if (!publication) {
        throw new ForbiddenException('Error');
      } else {
        return publication;
      }
  }

  async updatePublication(updatePublicationDto: UpdatePublicationDto): Promise<Publication> {
    const toUpdate: Publication = await this.publicationRepository.findOneBy({
      idPublication: updatePublicationDto.idPublication,
    });
    if (toUpdate) {
      toUpdate.idEtudiant = updatePublicationDto.idEtudiant;
      toUpdate.contenu = updatePublicationDto.contenu;
      toUpdate.type = updatePublicationDto.type;
      return await this.publicationRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Publication not found .. !');
    }
  }

  async deletePublication(id: string): Promise<Publication> {
    const publication: Publication = await this.publicationRepository.findOneBy({ idPublication: id });
    if (!publication) {
        throw new NotFoundException('Error');
    } else {
        await this.publicationRepository.delete({ idPublication: id });
        return publication;
    }
  }

}