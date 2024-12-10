import { EtudiantAuthService } from './etudiantAuth.service';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { SingInUserDTO } from '../dtos/signinUser.dto';

@Controller('/etudiant/auth')
export class etudiantAuthController {
  constructor(private etudiantAuthService: EtudiantAuthService) {}
  @Post('/signup')
  async signUp(@Body() etudiant: Etudiant): Promise<Etudiant> {
    return await this.etudiantAuthService.signUp(etudiant);
  }
  @Post('/signin')
  async signIn(@Body() userDto: SingInUserDTO) {
    return await this.etudiantAuthService.signIn(userDto);
  }
}
