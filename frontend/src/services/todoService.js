const BASE = '/api/todos';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
}

export const todoService = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v && v !== 'all')
    ).toString();
    return request(`${BASE}${qs ? `?${qs}` : ''}`);
  },
  create: (data) => request(BASE, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  toggle: (id) => request(`${BASE}/${id}/toggle`, { method: 'PATCH' }),
  remove: (id) => request(`${BASE}/${id}`, { method: 'DELETE' }),
  clearCompleted: () => request(`${BASE}/completed`, { method: 'DELETE' }),
};
