import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import * as dto from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/guards';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Body() registerDto: dto.RegisterUserDto) {
    return this.client.send('auth.register.user', registerDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  loginUser(@Body() loginDto: dto.LoginUserDto) {
    return this.client.send('auth.login.user', loginDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  verifyToken(@User() user: dto.UserDto, @Token() token: string) {
    return;
  }
}
