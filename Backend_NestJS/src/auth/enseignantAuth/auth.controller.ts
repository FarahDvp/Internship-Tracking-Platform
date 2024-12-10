import { User } from 'src/user/user.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Enseignant } from 'src/enseignant/enseignant.entity';
import { SingInUserDTO } from '../dtos/signinUser.dto';

@Controller('enseignant/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() enseignant: Enseignant): Promise<Enseignant> {
    return this.authService.signup(enseignant);
  }
  @Post('signIn')
  async signIn(@Body() signInUserDTO: SingInUserDTO) {
    return this.authService.signIn(signInUserDTO);
  }
}
