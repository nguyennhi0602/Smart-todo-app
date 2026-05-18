import { useState } from 'react';

const PRIORITY_COLOR = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };

export default function TodoItem({ todo, onToggle, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleBlur = async () => {
    setEditing(false);
    if (title.trim() && title !== todo.title) {
      await onUpdate(todo.id, { title });
    } else {
      setTitle(todo.title);
    }
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item--done' : ''}`}>
      <span className="todo-item__priority" style={{ background: PRIORITY_COLOR[todo.priority] }} title={todo.priority} />

      <input
        className="todo-item__checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <div className="todo-item__body">
        {editing ? (
          <input
            className="todo-item__edit"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => { if (e.key === 'Enter') handleBlur(); if (e.key === 'Escape') { setTitle(todo.title); setEditing(false); } }}
          />
        ) : (
          <span className="todo-item__title" onDoubleClick={() => setEditing(true)}>
            {todo.title}
          </span>
        )}
        {todo.description && <p className="todo-item__desc">{todo.description}</p>}
        <div className="todo-item__meta">
          {todo.dueDate && (
            <span className={`todo-item__due ${isOverdue ? 'todo-item__due--overdue' : ''}`}>
              {isOverdue ? 'Overdue: ' : 'Due: '}{new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
          {todo.tags.map((tag) => (
            <span key={tag} className="todo-item__tag">{tag}</span>
          ))}
        </div>
      </div>

      <button className="todo-item__delete" onClick={() => onRemove(todo.id)} aria-label="Delete">
        &#x2715;
      </button>
    </div>
  );
}
