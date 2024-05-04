import { Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserResponseDto | null> {
    const user = await this.userService.findByUsernameAuthVersion(username);
    if (user && await user.validatePassword(password)) {
      const userDto = new UserResponseDto();
      userDto.id = user.id;
      userDto.username = user.username;
      userDto.roles = user.userRoles.map(userRole => ({
        id: userRole.role.id,
        name: userRole.role.name
      }));

      return userDto;
    }
    return null;
  }
}
