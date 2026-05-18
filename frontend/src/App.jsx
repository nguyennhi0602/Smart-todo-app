import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

const DEFAULT_FILTERS = { filter: 'all', priority: 'all', sortBy: '' };

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const { todos, stats, loading, error, addTodo, updateTodo, toggleTodo, removeTodo, clearCompleted } = useTodos(filters);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Smart Todo</h1>
        <p className="app__subtitle">{stats.total} tasks &mdash; stay on top of it</p>
      </header>

      <main className="app__main">
        <TodoForm onAdd={addTodo} />
        <FilterBar
          filters={filters}
          onChange={setFilters}
          stats={stats}
          onClearCompleted={clearCompleted}
        />
        <TodoList
          todos={todos}
          loading={loading}
          error={error}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onRemove={removeTodo}
        />
      </main>
    </div>
  );
}
