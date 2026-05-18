import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAll(
    @Query('filter') filter?: string,
    @Query('priority') priority?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    return this.todosService.findAll(filter, priority, sortBy);
  }

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }

  @Delete('completed')
  clearCompleted() {
    return this.todosService.clearCompleted();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.todosService.toggle(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.todosService.remove(id);
  }
}
