import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'appUser',
    description: 'Username used for login.'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password associated with the username.'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
