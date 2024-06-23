import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOjEsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JWT access token issued after successful authentication.'
  })
  access_token: string;

  @ApiProperty({
    example: '8f8631e5ca877531e97877595fe77c039e5ad5a7e73fedd17ee865fda13ea757',
    description: 'Refresh token for re-authenticating or extending the session without re-entering credentials.'
  })
  refresh_token: string;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the user.'
  })
  user_id: number;
}