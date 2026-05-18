const FILTERS = ['all', 'active', 'completed'];
const PRIORITIES = ['all', 'low', 'medium', 'high'];
const SORTS = [
  { value: '', label: 'Default' },
  { value: 'createdAt', label: 'Newest' },
  { value: 'priority', label: 'Priority' },
  { value: 'dueDate', label: 'Due Date' },
];

export default function FilterBar({ filters, onChange, stats, onClearCompleted }) {
  const set = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <div className="filter-bar">
      <div className="filter-bar__stats">
        <span>{stats.active} active</span>
        <span>{stats.completed} done</span>
      </div>

      <div className="filter-bar__controls">
        <div className="filter-bar__group">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filters.filter === f ? 'filter-btn--active' : ''}`}
              onClick={() => onChange({ ...filters, filter: f })}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select className="filter-bar__select" value={filters.priority} onChange={set('priority')}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p === 'all' ? 'All priorities' : p.charAt(0).toUpperCase() + p.slice(1)}</option>
          ))}
        </select>

        <select className="filter-bar__select" value={filters.sortBy} onChange={set('sortBy')}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {stats.completed > 0 && (
        <button className="btn btn--ghost btn--sm" onClick={onClearCompleted}>
          Clear completed ({stats.completed})
        </button>
      )}
    </div>
  );
}
