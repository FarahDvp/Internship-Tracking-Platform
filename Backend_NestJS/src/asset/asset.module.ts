import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  controllers: [AssetController],
  imports:[MulterModule,TypeOrmModule.forFeature([EtudiantActuel])],
  providers: [AssetService]
})
export class AssetModule {}
