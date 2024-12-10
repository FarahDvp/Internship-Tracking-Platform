import { UseGuards, Request } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ChoosingPfaDto, UpdatePfaDto } from './dtos/updatePfa.dto';
import { Pfa } from './pfa.entity';
import { User } from 'src/user/user.entity';
import { PfaService } from './pfa.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/Roles';
import { Enseignant } from 'src/enseignant/enseignant.entity';
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)

export class PfaController {
  constructor(private pfaService: PfaService) { }
  @Get('pfa')
  async getAllPfa(): Promise<Pfa[]> {
    return this.pfaService.findAllPfa();
  }

  @Get('validated_pfa')
  async getAllValidatedPfa(): Promise<Pfa[]> {
    return this.pfaService.findAllValidatedPfa();
  }

  @Get('pfa/:id')
  async getPfaById(@Param() params): Promise<Pfa> {
    return await this.pfaService.findPfaById(params.id);
  }

  @Get('choisir_pfa/:id/:login')
  @Roles(Role.Etudiant)
  async affectencadrant(@Param() params) {
    return await this.pfaService.choisirPFA(params.id,params.login);
  }

  @Get('validate_pfa/:id')
  async validatePfa(@Param() params) {
    return await this.pfaService.validatePFA(params.id);
  }

  @Post('pfa')
  @Roles(Role.Enseignant)
  async addPfa(@Body() pfa: Pfa): Promise<Pfa> {
    return this.pfaService.addPfa(pfa);
  }

  @Get('pfa')
  @Roles(Role.Enseignant)
  async getPfa(): Promise<Pfa[]> {
    return this.pfaService.findAllPfa(); 
  }

 

  @Get('pfa/enseignant')
  @Roles(Role.Enseignant)
  @UseGuards(JwtAuthGuard)
  async getAllPfaByTeacher(@Request() request): Promise<Pfa[]> {
    const user: User = request.user;
    const enseignantId: string = user.id.toString(); // Convert to primitive string type
    return this.pfaService.findPfaByTeacher(enseignantId);
  }

  @Delete('pfa/:id')
  @Roles(Role.Enseignant)
  async deletePfa(@Param() params) {
    return await this.pfaService.deletePfaById(params.id);
  }

  @Put('pfa/update/:id')
  @Roles(Role.Enseignant)
  async updatePfa(@Body() updatePfadto: UpdatePfaDto) {
    return await this.pfaService.updatePfaById(updatePfadto);
  }
}
