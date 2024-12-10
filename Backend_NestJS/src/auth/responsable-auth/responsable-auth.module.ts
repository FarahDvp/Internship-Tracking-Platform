import { Responsable } from 'src/responsable/responsable.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResponsableAuthController } from './responsable-auth.controller';
import { ResponsableAuthService } from './responsable-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Responsable]), JwtModule.register({})],
  controllers: [ResponsableAuthController],
  providers: [ResponsableAuthService, JwtStrategy],
})
export class ResponsableAuthModule {}
