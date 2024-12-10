import { Etudiant } from 'src/etudiant/etudiant.entity';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
