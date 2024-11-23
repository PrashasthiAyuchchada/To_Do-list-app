// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks
const renderTasks = () => {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">&times;</button>
    `;
    taskList.appendChild(li);
  });
};

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    taskInput.value = '';
  }
});

// Toggle task completion
const toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
};

// Delete task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
};

// Save tasks to LocalStorage and re-render
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

// Initial render
renderTasks();
