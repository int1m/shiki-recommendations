import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}

  onApplicationBootstrap() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.usersService.shikimoriUsersParsingBootstrap(200);
  }
}
