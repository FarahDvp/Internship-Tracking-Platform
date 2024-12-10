import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Admin } from 'src/admin/admin.entity';
import { MongoRepository } from 'typeorm';
import { Role } from '../Roles';
import { SingInUserDTO } from '../dtos/signinUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin) private adminRepository: MongoRepository<Admin>,
    private jwtService: JwtService,
  ) {}

  async signUp(admin: Admin): Promise<Admin> {
    const hash = await argon.hash(admin.mdp);
    admin.mdp = hash;
    admin.roles = [Role.Admin];
    return this.adminRepository.save(admin);
  }

  async signIn(
    singInUserdto: SingInUserDTO,
  ): Promise<{ access_token: string,user:any }> {
    const user = await this.adminRepository.findOneBy({
      login: singInUserdto.login,
    });
    if (!user) {
      throw new NotFoundException('User Not found ... ! ');
    } else {
      const passwordVerify = argon.verify(user.mdp, singInUserdto.mdp);
      if (!passwordVerify) {
        throw new ForbiddenException('Invalid Credentials ... ! ');
      } else {
        let access_token= await this.signToken(user.login, user.mdp, user.roles);
        return {... access_token, user : user};
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
