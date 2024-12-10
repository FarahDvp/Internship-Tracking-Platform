import { ResponsableService } from './responsable.service';
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
import { Responsable } from './responsable.entity';
import { UpdateResponsableDto } from './dto/updateResponsable.dto';
import { ChangerMdpResponsable } from './dto/changemdp.dto';

@Controller('responsable')
export class ResponsableController {

constructor(private responsableService: ResponsableService) {}

  @Post('/create')
  async addNewResponsable(@Body() responsable: Responsable): Promise<Responsable> {
    return this.responsableService.addResponsable(responsable);
  }

  @Get()
  async getAll(): Promise<Responsable[]> {
    return this.responsableService.getAll();
  }

  @Get('/:id')
  async getResponsableById(@Param() params): Promise<Responsable> {
    return this.responsableService.getResponsableById(params.id);
  }

  @Put()
  async updateResponsable(@Body() responsable: UpdateResponsableDto): Promise<Responsable> {
    return this.responsableService.updateResponsable(responsable);
  }

  @Delete('/:id')
  async deleteResponsable(@Param() params): Promise<Responsable> {
    return this.responsableService.deleteResponsable(params.id);
  }

  @Put('/changepass')
  async changerMdpResponsable(@Body() changerMdpResponsable: ChangerMdpResponsable): Promise<Responsable> {
    return this.responsableService.changerMdpResponsable(changerMdpResponsable);
  }
}
