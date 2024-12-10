import { Body, Controller, Post } from '@nestjs/common';
import { Responsable } from 'src/responsable/responsable.entity';
import { ResponsableService } from 'src/responsable/responsable.service';
import { ResponsableAuthService } from './responsable-auth.service';
import { SingInUserDTO } from '../dtos/signinUser.dto';

@Controller('responsable/auth')
export class ResponsableAuthController {
  constructor(private responsableAuthService: ResponsableAuthService) {}
  @Post('/signup')
  async signUp(@Body() responsable: Responsable): Promise<Responsable> {
    console.log(responsable);
    return await this.responsableAuthService.signUp(responsable);
  }

  @Post('/signin')
  async signIn(
    @Body()
    signInUserDTO: SingInUserDTO,
  ): Promise<{ access_token: string }> {
    return await this.responsableAuthService.signIn(signInUserDTO);
  }
}
