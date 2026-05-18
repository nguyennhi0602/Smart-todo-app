import { IsString, IsNotEmpty, IsOptional, IsIn, IsArray } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @IsOptional()
  dueDate?: string | null;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
