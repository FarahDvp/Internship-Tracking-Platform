import { JwtService } from '@nestjs/jwt';
import { MongoRepository } from 'typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Responsable } from 'src/responsable/responsable.entity';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../Roles';
import { SingInUserDTO } from '../dtos/signinUser.dto';

@Injectable()
export class ResponsableAuthService {
  constructor(
    @InjectRepository(Responsable)
    private responsableRepository: MongoRepository<Responsable>,
    private jwtService: JwtService,
  ) {}
  async signUp(responsable: Responsable): Promise<Responsable> {
    const hash = await argon.hash(responsable.mdp);
    responsable.mdp = hash;
    responsable.roles = [Role.Responsable];
    return this.responsableRepository.save(responsable);
  }
  async signIn(
    signinUserDTO: SingInUserDTO,
  ): Promise<{ access_token: string,user:any }> {
    const user: Responsable = await this.responsableRepository.findOneBy({
      login: signinUserDTO.login,
    });
    if (!user) {
      throw new ForbiddenException('Wrong Credentials ... !');
    } else {
      const passwordVerify = await argon.verify(user.mdp, signinUserDTO.mdp);
      if (!passwordVerify) {
        throw new ForbiddenException('Wrong Credentials...!');
      } else {
        const token = await this.signToken(user.login, user.mdp, user.roles);
        return {...token,user:user};
      }
    }
  }
  async signToken(
    login: Number,
    mdp: string,
    roles,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: login,
      mdp,
      roles,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: 'schoolManager',
      expiresIn: '15m',
    });
    return {
      access_token: access_token,
    };
  }
}
