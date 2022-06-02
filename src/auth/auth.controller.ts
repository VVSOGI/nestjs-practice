import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // localhost:3000/auth/signup
  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(authCredentialsDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.authService.getUserById(id);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.authService.deleteUser(id);
  }

  @Post('/authTest')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req', req);
  }
}
