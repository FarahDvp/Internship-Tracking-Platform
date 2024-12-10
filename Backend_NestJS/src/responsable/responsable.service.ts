import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangerMdpResponsable } from './dto/changemdp.dto';
import { UpdateResponsableDto } from './dto/updateResponsable.dto';
import { Responsable } from './responsable.entity';
import * as argon from 'argon2';

@Injectable()
export class ResponsableService {
  constructor(
    @InjectRepository(Responsable)
    private responsableRepository: Repository<Responsable>,
  ) {}

  async addResponsable(responsable: Responsable): Promise<Responsable> {
    return this.responsableRepository.save(responsable);
  }

  async getAll(): Promise<Responsable[]> {
    return this.responsableRepository.find();
  }

  async getResponsableById(id: string): Promise<Responsable> {
    const responsable: Responsable = await this.responsableRepository.findOneBy(
      {
        idResponsable: id,
      },
    );
    if (!responsable) {
      throw new ForbiddenException('Error');
    } else {
      return responsable;
    }
  }

  async deleteResponsable(id: string): Promise<Responsable> {
    const responsable: Responsable = await this.responsableRepository.findOneBy(
      { idResponsable: id },
    );
    if (!responsable) {
      throw new NotFoundException('Error');
    } else {
      await this.responsableRepository.delete({ idResponsable: id });
      return responsable;
    }
  }

  async updateResponsable(
    updateResponsableDto: UpdateResponsableDto,
  ): Promise<Responsable> {
    const toUpdate: Responsable = await this.responsableRepository.findOneBy({
      idResponsable: updateResponsableDto.idResponsable,
    });
    if (toUpdate) {
      toUpdate.nom = updateResponsableDto.nom;
      toUpdate.prenom = updateResponsableDto.prenom;
      toUpdate.roles = updateResponsableDto.roles;
      toUpdate.email = updateResponsableDto.email;
      return await this.responsableRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Responsable not found .. !');
    }
  }

  async changerMdpResponsable(
    changerMdpResponsable: ChangerMdpResponsable,
  ): Promise<Responsable> {
    const responsable: Responsable = await this.getResponsableById(
      changerMdpResponsable.id,
    );
    if (!responsable) {
      throw new ForbiddenException('Responsable Not Found');
    }
    responsable.mdp = await argon.hash(changerMdpResponsable.mdp);
    return this.responsableRepository.save(responsable);
  }
}
