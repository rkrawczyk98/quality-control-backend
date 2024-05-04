import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOjEsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JWT access token',
  })
  access_token: string;
}
