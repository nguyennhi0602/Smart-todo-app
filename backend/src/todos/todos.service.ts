import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  findAll(filter?: string, priority?: string, sortBy?: string) {
    let result = [...this.todos];

    if (filter === 'active') result = result.filter((t) => !t.completed);
    else if (filter === 'completed') result = result.filter((t) => t.completed);

    if (priority) result = result.filter((t) => t.priority === priority);

    if (sortBy === 'priority') {
      const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
      result.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortBy === 'createdAt') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'dueDate') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    return { data: result, stats: this.stats() };
  }

  findOne(id: string) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException('Todo not found');
    return { data: todo };
  }

  create(dto: CreateTodoDto) {
    const { title, description = '', priority = 'medium', dueDate = null, tags = [] } = dto;
    const todo: Todo = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      dueDate,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return { data: todo };
  }

  update(id: string, dto: UpdateTodoDto) {
    const idx = this.todos.findIndex((t) => t.id === id);
    if (idx === -1) throw new NotFoundException('Todo not found');
    this.todos[idx] = { ...this.todos[idx], ...dto, updatedAt: new Date().toISOString() };
    return { data: this.todos[idx] };
  }

  toggle(id: string) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException('Todo not found');
    return this.update(id, { completed: !todo.completed });
  }

  remove(id: string) {
    const idx = this.todos.findIndex((t) => t.id === id);
    if (idx === -1) throw new NotFoundException('Todo not found');
    this.todos.splice(idx, 1);
  }

  clearCompleted() {
    const before = this.todos.length;
    this.todos = this.todos.filter((t) => !t.completed);
    return { deleted: before - this.todos.length };
  }

  private stats() {
    return {
      total: this.todos.length,
      completed: this.todos.filter((t) => t.completed).length,
      active: this.todos.filter((t) => !t.completed).length,
    };
  }
}
