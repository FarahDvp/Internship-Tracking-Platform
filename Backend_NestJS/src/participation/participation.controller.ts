import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
import { AddParticipationDto } from './dto/addparticipation.dto';
import { Valider } from './dto/valider.dto';
import { Participation } from './participation.entity';
import { ParticipationService } from './participation.service';

@Controller('participation')
export class ParticipationController {

    constructor(private participationService: ParticipationService) {}


    @Get()
    async getAll(): Promise<Participation[]> {
        return this.participationService.getAll();
    }

    @Get('/:id')
    async getParticipationById(@Param() params): Promise<Participation> {
      console.log(params);
      return this.participationService.getParticipationById(params.id);
    }

    @Post('/add')
    async addParticipation(@Body() participation:Participation) {
        return this.participationService.addParticipation(participation);
    }

    @Put()
    async updateOffreConseil(@Body() participation: AddParticipationDto): Promise<Participation> {
        return this.participationService.updateParticipation(participation);
    }

    @Delete('/:id')
    async deleteEvenement(@Param() params): Promise<Participation> {
        return this.participationService.deleteParticipation(params.id);
    }

    @Put('/validate')
    async validateParticipation(@Body() valider : Valider ) : Promise<Participation> {
        return this.participationService.validateParticipation(valider);
    }

}
