import TodoItem from './TodoItem';

export default function TodoList({ todos, loading, error, onToggle, onUpdate, onRemove }) {
  if (loading) return <div className="state-msg">Loading...</div>;
  if (error) return <div className="state-msg state-msg--error">Error: {error}</div>;
  if (!todos.length) return <div className="state-msg">No tasks found. Add one above!</div>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} onToggle={onToggle} onUpdate={onUpdate} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  );
}
