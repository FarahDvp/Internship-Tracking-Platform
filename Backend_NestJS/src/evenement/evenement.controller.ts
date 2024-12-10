import { UseGuards } from '@nestjs/common/decorators';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UpdateEvenementDto } from './dto/updateEvenement.dto';
import { Evenement } from './evenement.entity';
import { EvenementService } from './evenement.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/Roles';

@Controller('evenement')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EvenementController {
  constructor(private evenementService: EvenementService) {}

  @Roles(Role.Admin)
  @Post('/create')
  async addNewEvenement(@Body() evenement: Evenement): Promise<Evenement> {
    return this.evenementService.addEvenement(evenement);
  }

  @Get()
  async getAll(): Promise<Evenement[]> {
    return this.evenementService.findAll();
  }

  @Get('/:id')
  async getEvenementById(@Param() params): Promise<Evenement> {
    console.log(params);
    return this.evenementService.findEvenementById(params.id);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async deleteEvenement(@Param() params): Promise<Evenement> {
    return this.evenementService.deleteEvenement(params.id);
  }

  @Put()
  @Roles(Role.Admin)
  async updateEvenement(
    @Body() evenement: UpdateEvenementDto,
  ): Promise<Evenement> {
    return this.evenementService.updateEvenement(evenement);
  }
}
