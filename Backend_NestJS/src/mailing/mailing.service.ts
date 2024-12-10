import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendEmailToAddDiploma(toemail: string, name: String) {
    await this.mailerService.sendMail({
      to: toemail,
      from: 'pivario1234@gmail.com',
      subject: 'Ajout du diplome ',
      text: `Bonjour Mr/Mme ${name},
                Prière d'ajouter votre date d'obtention du diplome . 
                    Cordialement , 
      `,
    });
  }

  async sendEmailToAddJob(toemail: string, name: String) {
    await this.mailerService.sendMail({
      to: toemail,
      from: 'pivario1234@gmail.com',
      subject: 'Mise à jour du travail ',
      text: `Bonjour Mr/Mme ${name},
                Prière de mettre à jour votre travail en cas de changement  . 
                    Cordialement , 
      `,
    });
  }
}
