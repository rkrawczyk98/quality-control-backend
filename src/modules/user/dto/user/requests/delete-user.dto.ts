import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
    @ApiProperty({ description: 'Id of the user' })
    @IsNotEmpty()
    id: number;
}