let tasks = [];
let currentFilter = 'all';

// Set today's date
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now = new Date();
document.getElementById('dateBadge').textContent =
  `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, done: false });
  input.value = '';
  render();
}

document.getElementById('taskInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function clearDone() {
  tasks = tasks.filter(t => !t.done);
  render();
}

function setFilter(f, el) {
  currentFilter = f;
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  render();
}

function render() {
  const list = document.getElementById('taskList');
  const filtered = tasks.filter(t => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });

  const remaining = tasks.filter(t => !t.done).length;
  document.getElementById('subtitle').textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
  document.getElementById('footerCount').textContent = `${remaining} left`;

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="e-icon">${currentFilter === 'done' ? '✅' : '📋'}</div><p>${currentFilter === 'done' ? 'No completed tasks yet' : 'No tasks here!'}</p></div>`;
    return;
  }

  list.innerHTML = filtered.map(t => `
    <li class="task-item">
      <button class="check-btn ${t.done ? 'done' : ''}" onclick="toggleTask(${t.id})">${t.done ? '✓' : ''}</button>
      <span class="task-text ${t.done ? 'done' : ''}">${t.text}</span>
      <button class="del-btn" onclick="deleteTask(${t.id})">🗑</button>
    </li>
  `).join('');
}

// Start with some sample tasks
tasks = [
  { id: 1, text: 'Complete portfolio website', done: true },
  { id: 2, text: 'Push projects to GitHub', done: false },
  { id: 3, text: 'Apply for web developer jobs', done: false },
];
render();
