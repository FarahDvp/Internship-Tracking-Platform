import { UseGuards } from '@nestjs/common/decorators';
import { PublicationService } from './publication.service';
import { Publication } from './publication.entity';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UpdatePublicationDto } from './dto/updatePublication.dto';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from 'src/auth/Roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('publication')
@UseGuards(JwtAuthGuard)
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Roles(Role.Etudiant)
  @Post('/create')
  async addNewPublication(
    @Body() publication: Publication,
  ): Promise<Publication> {
    return this.publicationService.addPublication(publication);
  }

  @Get()
  async getAll(): Promise<Publication[]> {
    return this.publicationService.getAll();
  }

  @Get('/:id')
  async getPublicationById(@Param() params): Promise<Publication> {
    console.log(params);
    return this.publicationService.getPublicationById(params.id);
  }

  @Put()
  async updatePublication(
    @Body() publication: UpdatePublicationDto,
  ): Promise<Publication> {
    return this.publicationService.updatePublication(publication);
  }

  @Delete('/:id')
  async deletePublication(@Param() params): Promise<Publication> {
    return this.publicationService.deletePublication(params.id);
  }
}
