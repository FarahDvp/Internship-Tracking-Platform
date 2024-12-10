import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { StageEteService } from './stage-ete.service';
import { StageEte } from './stageEte.entity';

@Controller('stage-ete')
export class StageEteController {

    constructor(private StageSetrvice: StageEteService) { }
    @Get()
    async getallstages(): Promise<StageEte[]> {
      return this.StageSetrvice.findAllStageEte();
    }
}
