import { Body, Controller, Delete, Get, Param, Post, Put,Patch } from '@nestjs/common';
import { StageEte } from 'src/stage-ete/stageEte.entity';
import { Cv } from 'src/stage/entities/cv.entity';
import { EtudiantActuelService } from './etudiant-actuel.service';
import { Etudiantacttoupdate } from './etudiantact.dto';
import { EtudiantActuel } from './etudiantActuel.entity';

@Controller('etudiant-actuel')
export class EtudiantActuelController {

    constructor(private etudiantactuel: EtudiantActuelService) { }

    @Get('/all')
    async getallEtudiantact(): Promise<EtudiantActuel[]> {
        return this.etudiantactuel.get();
    }

    @Get('/:id')
    async getEtudiantActuel(@Param('id') params:string): Promise<EtudiantActuel> {
        return await this.etudiantactuel.findOne(params);
    }
    @Get('/get_by_login/:id')
    async getEtudiantDetails(@Param('id') params:string): Promise<EtudiantActuel> {
        return await this.etudiantactuel.findOneByLogin(params);
    }
    @Post('/insert')
    async addEdutact(@Body() EtudiantActuel: EtudiantActuel): Promise<EtudiantActuel> {
        return this.etudiantactuel.insertOne(EtudiantActuel);
    }
    @Post('/addstage/:id')
    async addstage(@Param('id') id:string,@Body() stage:StageEte ){
        return this.etudiantactuel.addstage(id,stage);
    }
    @Post('/updateCv/:id')
    async addCv(@Param('id') id:string,@Body() cv:Cv){
        return await this.etudiantactuel.updatecv(id,cv)
    }
    @Delete('/:id')
    async deleteEtudact(@Param() params:string) {
        return await this.etudiantactuel.deleteOne(params);
    }
    @Put('/update/:id')
    async updateEtudact(@Body() updatestudent: Etudiantacttoupdate) {
        return await this.etudiantactuel.updateOne(updatestudent);
    }





    @Patch('/updateCv/:id')
    async update_cv(@Param('id') id:string,@Body() cv:Cv){
        return await this.etudiantactuel.updatecv(id,cv)
    }
}

