import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { LoginUser } from '../../user/user.type';
import { AppConfigService } from '../../app-config/app-config.service';
import { CLIENT_LOGIN_RESULT_URL_NAME } from '../../app-config/app-config.constant';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(
    private authService: AuthService,
    private appConfigService: AppConfigService,
  ) {}
  private readonly logger = new Logger(GoogleAuthController.name);

  @Get()
  @UseGuards(AuthGuard('google'))
  login() {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req: Request, @Res() res: Response) {
    const { access_token } = await this.authService.login(
      req.user as LoginUser,
    );

    const loginResultUrl = await this.appConfigService.getValue(
      CLIENT_LOGIN_RESULT_URL_NAME,
    );

    this.logger.log(loginResultUrl);

    res.redirect(loginResultUrl + `?access_token=${access_token}`);

    // // res.cookie('access_token', access_token);
    // // return req.user;
    //
    // // res.setHeader('Set-Cookie', );
    // console.log(serialize('access_token', access_token));
    // res.writeHead(302, {
    //   Location: 'http://localhost:5173',
    //   'Set-Cookie': serialize('access_token', access_token),
    // });
    // res.end();

    // res.redirect(302, 'http://localhost:5173');
  }
}
