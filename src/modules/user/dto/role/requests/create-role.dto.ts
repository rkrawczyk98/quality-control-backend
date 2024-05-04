import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ description: 'The name of the role.' })
    @IsNotEmpty()
    name: string;
}
