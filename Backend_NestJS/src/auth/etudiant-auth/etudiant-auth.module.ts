import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { etudiantAuthController } from './etudiantAuth.controller';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { EtudiantAuthService } from './etudiantAuth.service';
import { Etudiant } from 'src/etudiant/etudiant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant]), JwtModule.register({})],
  controllers: [etudiantAuthController],
  providers: [EtudiantAuthService, JwtStrategy],
})
export class EtudiantAuthModule {}
