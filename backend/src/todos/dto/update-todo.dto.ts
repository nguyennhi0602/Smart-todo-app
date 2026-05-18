import { IsString, IsNotEmpty, IsOptional, IsIn, IsArray, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @IsOptional()
  dueDate?: string | null;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
