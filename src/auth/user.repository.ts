import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserById(id: number): Promise<User> {
    const findUser = await this.findOne(id);

    if (findUser) {
      return findUser;
    }

    throw new NotFoundException('Not exists user');
  }

  async deleteUser(id: number): Promise<void> {
    const { id: findId } = await this.getUserById(id);
    this.delete(findId);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    jwtService: JwtService,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await compare(password, user.password))) {
      const payload = { username };
      const accessToken = await jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }
}
