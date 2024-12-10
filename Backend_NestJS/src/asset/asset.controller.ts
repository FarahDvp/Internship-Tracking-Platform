import { Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { parse } from 'papaparse';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { Repository } from 'typeorm';
import { AssetService } from './asset.service';

const { Readable } = require('stream');


@Controller('asset')
export class AssetController {
    constructor(private service: AssetService) {}


    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {})
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
       const etudiants = await this.service.create(file);
      
       
       
       return etudiants;

    }
}