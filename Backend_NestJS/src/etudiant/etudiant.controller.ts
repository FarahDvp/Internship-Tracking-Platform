import { Controller, Get, Param } from '@nestjs/common';
import { Etudiant } from './etudiant.entity';
import { EtudiantService } from './etudiant.service';

@Controller('etudiant')
export class EtudiantController {
    constructor(private etudiantservice: EtudiantService) { }


    @Get('/all')
    async getallEtudiantact(): Promise<Etudiant[]> {
        return this.etudiantservice.get();
    }
    @Get('/:id')
    async getEtudiantActuel(@Param('id') params:string): Promise<Etudiant> {
        return await this.etudiantservice.findOne(params);
    }
}
