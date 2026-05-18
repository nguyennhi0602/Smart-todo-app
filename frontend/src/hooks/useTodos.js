import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';

export function useTodos(filters) {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await todoService.getAll(filters);
      setTodos(res.data);
      setStats(res.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.filter, filters.priority, filters.sortBy]); // eslint-disable-line

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const addTodo = async (data) => {
    const res = await todoService.create(data);
    setTodos((prev) => [res.data, ...prev]);
    setStats((s) => ({ ...s, total: s.total + 1, active: s.active + 1 }));
  };

  const updateTodo = async (id, data) => {
    const res = await todoService.update(id, data);
    setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  const toggleTodo = async (id) => {
    const res = await todoService.toggle(id);
    setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    setStats((s) => {
      const wasCompleted = todos.find((t) => t.id === id)?.completed;
      return {
        ...s,
        completed: wasCompleted ? s.completed - 1 : s.completed + 1,
        active: wasCompleted ? s.active + 1 : s.active - 1,
      };
    });
  };

  const removeTodo = async (id) => {
    await todoService.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setStats((s) => {
      const todo = todos.find((t) => t.id === id);
      return {
        total: s.total - 1,
        completed: todo?.completed ? s.completed - 1 : s.completed,
        active: todo?.completed ? s.active : s.active - 1,
      };
    });
  };

  const clearCompleted = async () => {
    await todoService.clearCompleted();
    setTodos((prev) => prev.filter((t) => !t.completed));
    setStats((s) => ({ ...s, total: s.total - s.completed, completed: 0 }));
  };

  return { todos, stats, loading, error, addTodo, updateTodo, toggleTodo, removeTodo, clearCompleted };
}
