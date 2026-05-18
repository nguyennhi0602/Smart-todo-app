export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDate: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
