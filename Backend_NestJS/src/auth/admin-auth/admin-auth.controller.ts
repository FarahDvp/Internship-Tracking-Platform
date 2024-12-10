import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

import { Admin } from 'src/admin/admin.entity';
import { SingInUserDTO } from '../dtos/signinUser.dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('/signup')
  async signUp(@Body() admin: Admin) {
    return this.adminAuthService.signUp(admin);
  }

  @Post('signin')
  async signIn(
    @Body()
    signInuserDto: SingInUserDTO,
  ): Promise<{ access_token: string }> {
    return this.adminAuthService.signIn(signInuserDto);
  }
}
