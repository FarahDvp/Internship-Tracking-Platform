import { DeleteResult } from 'typeorm';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Enseignant } from './enseignant.entity';
import { EnseignantService } from './enseignant.service';
import { ChangerMdpEnseignant } from './dtos/changemdp.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('enseignant')
export class EnseignantController {
  constructor(private enseignantService: EnseignantService) {}
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllEnseignant(): Promise<Enseignant[]> {
    return this.enseignantService.getAllEnseignant();
  }

  @Get('/:id')
  async getEnseignantById(@Param() params): Promise<Enseignant> {
    console.log(params);
    return this.enseignantService.getEnseignantById(params.id);
  }
  @Post()
  async addNewEnseignant(@Body() enseignant: Enseignant): Promise<Enseignant> {
    return this.enseignantService.addEnseignant(enseignant);
  }

  @Put()
  async changerMdpEnseignant(
    @Body() changerMdpEnseignant: ChangerMdpEnseignant,
  ): Promise<Enseignant> {
    return this.enseignantService.changerMdpEnseignant(changerMdpEnseignant);
  }
  @Delete('/:id')
  async deleteEnseignantById(@Param() params): Promise<DeleteResult> {
    return this.enseignantService.deleteEnseignantById(params.id);
  }
}
