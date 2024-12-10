import { JwtStrategy } from './../strategy/jwt.strategy';
import { SingInUserDTO } from './../dtos/signinUser.dto';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../Roles';

@Injectable()
export class EtudiantAuthService {
  constructor(
    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,
    private jwtService: JwtService,
  ) {}

  async signUp(etudiant: Etudiant): Promise<Etudiant> {
    const hash = await argon.hash(etudiant.mdp);
    etudiant.mdp = hash;
    etudiant.roles = [Role.Etudiant];
    return await this.etudiantRepository.save(etudiant);
  }

  async signIn(signInUser: SingInUserDTO): Promise<{ access_token: string,user:any }> {
    const etudiant: Etudiant = await this.etudiantRepository.findOneBy({
      login: signInUser.login,
    });
    if (!etudiant) {
      throw new ForbiddenException('User is not Found !');
    } else {
      const passwordVerify = argon.verify(etudiant.mdp, signInUser.mdp);
      if (passwordVerify) {
        const token = await this.signToken(etudiant.login, etudiant.mdp, etudiant.roles);
        return {...token,user:etudiant };
      } else {
        throw new ForbiddenException('Invalid credentials ...');
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
