import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePermissionDto {
    @ApiProperty({ description: 'Name of the permission' })
    @IsOptional()
    name?: string;
}