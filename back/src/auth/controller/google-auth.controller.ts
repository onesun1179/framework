import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '@auth/auth.service';
import { ACCESS_TOKEN_COOKIE_NAME } from '@auth/auth.constant';
import { LoginUser } from '@modules/user/user.type';

@Controller('auth/google')
export class GoogleAuthController {
  private readonly logger = new Logger(GoogleAuthController.name);

  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  login() {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req: Request, @Res() res: Response) {
    const { access_token } = await this.authService.login(
      req.user as LoginUser,
    );

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, access_token);

    res.redirect(process.env.CLIENT_DOMAIN!);

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
