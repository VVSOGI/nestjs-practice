import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    await this.save(user);
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
}
