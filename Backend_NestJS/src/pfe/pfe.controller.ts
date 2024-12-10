import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { EncadrantDto, UpdatePfeDto } from './pfe.dto';
import { Pfe } from './pfe.entity';
import { PfeService } from './pfe.service';

@Controller('pfe')
export class PfeController {
    constructor(private pfeService: PfeService) { }
    @Get()
    async getAllPfe(): Promise<Pfe[]> {
        return this.pfeService.findAllPfe();
    }
    @Get('/stat')
    async getstats():Promise<any>{
        return  this.pfeService.stats();
    }
    @Get('/:id')
    async getPfeById(@Param('id') params: string): Promise<Pfe> {
        return await this.pfeService.findPfeById(params);
    }
    @Post('/create')
    async addPfe(@Body() pfe: Pfe): Promise<Pfe> {
        console.log(pfe);
        
        return this.pfeService.addPfe(pfe);
    }
    @Delete('/:id')
    async deletePfe(@Param('id') params) {
        return await this.pfeService.deletePfeById(params);
    }

    @Put('/update')
    async updatePfe(@Body() updatePfadto: UpdatePfeDto) {
        return await this.pfeService.updatePfeById(updatePfadto);
    }
    @Post('/encadrant')
    async affectencadrant(@Body() toEncader: EncadrantDto) {
        return await this.pfeService.beEncadrant(toEncader.idpfe, toEncader.idEnseignant)

    }
    

}
