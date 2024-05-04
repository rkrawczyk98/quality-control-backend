import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'appUser',
    description: 'Username of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
