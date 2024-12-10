import { MailingService } from 'src/mailing/mailing.service';
import { Controller, Get, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('mailing')
export class MailingController {
  constructor(
    private mailerService: MailerService,
    private mailingService: MailingService,
  ) {}

  @Get('plain-text-email')
  async sendEmail(@Query('toemail') toemail: string) {
    //http://localhost:3000/mailing/plain-text-email?toemail=pivario1234@gmail.com
    // await this.mailerService.sendMail({
    //   to: toemail,
    //   from: 'pivario1234@gmail.com',
    //   subject: 'nodemailer test ',
    //   text: ' Test School-manager',})
    await this.mailingService.sendEmailToAddDiploma(toemail, 'houcem');
    return 'sucess';
  }
}
