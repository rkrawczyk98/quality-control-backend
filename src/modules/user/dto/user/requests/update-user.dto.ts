import { ApiProperty } from '@nestjs/swagger';
import { MinLength, Matches, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({message: 'Current password is required'})
  @ApiProperty({ description: 'Current password of the user' })
  currentPassword: string;

  @IsNotEmpty({message: 'New password is required'})
  @ApiProperty({ description: 'New password of the user' })
  @MinLength(8, {
    message: 'New password must be at least 8 characters long',
    groups: ['password'],
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    groups: ['password'],
  })
  newPassword: string;
}
