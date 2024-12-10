import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { ResponsableModule } from './responsable/responsable.module';
import { AdminModule } from './admin/admin.module';
import { PfaModule } from './pfa/pfa.module';
import { PfeModule } from './pfe/pfe.module';
import { EvenementModule } from './evenement/evenement.module';
import { PublicationModule } from './publication/publication.module';
import { EtudiantAlumniModule } from './etudiant-alumni/etudiant-alumni.module';
import { EtudiantActuelModule } from './etudiant-actuel/etudiant-actuel.module';
import { AuthModule } from './auth/enseignantAuth/auth.module';
import { MailingModule } from './mailing/mailing.module';
import { AssetModule } from './asset/asset.module';
import { EtudiantAuthModule } from './auth/etudiant-auth/etudiant-auth.module';
import { ParticipationModule } from './participation/participation.module';


import { ResponsableAuthModule } from './auth/responsable-auth/responsable-auth.module';
import { AdminAuthModule } from './auth/admin-auth/admin-auth.module';
import { StageModule } from './stage/cv.module';
import { StageEteModule } from './stage-ete/stage-ete.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    EtudiantModule,
    EnseignantModule,
    ResponsableModule,
    AdminModule,
    PfaModule,
    PfeModule,
    EvenementModule,
    ParticipationModule,
    PublicationModule,
    EtudiantAlumniModule,
    EtudiantActuelModule,
    AuthModule,
    MailingModule,
    AssetModule,
    EtudiantAuthModule,
    StageModule,
    ResponsableAuthModule,
    AdminAuthModule,
    StageEteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
