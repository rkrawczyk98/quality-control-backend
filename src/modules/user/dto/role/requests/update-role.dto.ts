import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateRoleDto {
    @ApiProperty({ description: 'The new name of the role.', required: false })
    @IsOptional()
    name?: string;
}
