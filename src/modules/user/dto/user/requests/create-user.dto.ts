import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
  password: string;
}
