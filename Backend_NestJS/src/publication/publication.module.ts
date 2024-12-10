import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { Publication } from './publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  providers: [PublicationService],
  controllers: [PublicationController]
})
export class PublicationModule {}
