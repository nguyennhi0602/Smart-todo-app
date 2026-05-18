import { useState } from 'react';

const EMPTY = { title: '', description: '', priority: 'medium', dueDate: '', tags: '' };

export default function TodoForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    try {
      await onAdd({
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        dueDate: form.dueDate || null,
      });
      setForm(EMPTY);
      setExpanded(false);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__row">
        <input
          className="todo-form__input"
          type="text"
          placeholder="Add a new task..."
          value={form.title}
          onChange={set('title')}
          onFocus={() => setExpanded(true)}
        />
        <button className="btn btn--primary" type="submit">Add</button>
      </div>

      {expanded && (
        <div className="todo-form__extra">
          <textarea
            className="todo-form__textarea"
            placeholder="Description (optional)"
            value={form.description}
            onChange={set('description')}
            rows={2}
          />
          <div className="todo-form__meta">
            <label className="todo-form__label">
              Priority
              <select className="todo-form__select" value={form.priority} onChange={set('priority')}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="todo-form__label">
              Due Date
              <input className="todo-form__select" type="date" value={form.dueDate} onChange={set('dueDate')} />
            </label>
            <label className="todo-form__label">
              Tags
              <input className="todo-form__select" type="text" placeholder="tag1, tag2" value={form.tags} onChange={set('tags')} />
            </label>
          </div>
        </div>
      )}
      {error && <p className="todo-form__error">{error}</p>}
    </form>
  );
}
