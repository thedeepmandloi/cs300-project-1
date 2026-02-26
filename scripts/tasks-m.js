// ==========================================
// 1. LOAD data from localStorage (safe pattern)
// ==========================================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ==========================================
// 2. SAVE function
// ==========================================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================================
// 3. RENDER function (Template Literals + Data Attributes)
// ==========================================
function renderTasks() {
  const taskList = document.querySelector("#task-list");
  const taskCount = document.querySelector("#task-count");

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    // TEMPLATE LITERAL: Build HTML with embedded data
    // DATA ATTRIBUTES: Store id and priority on the element
    taskList.insertAdjacentHTML(
      "beforeend",
      `
                    <div class="task-item" data-id="${task.id}">
                        <span class="task-text ${task.completed ? "completed" : ""}">
                            ${task.text}
                        </span>
                        <span class="badge badge-${task.priority}">
                            ${task.priority}
                        </span>
                        <button class="complete-btn">
                            ${task.completed ? "Undo" : "Done"}
                        </button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `,
    );
  });

  // Update count
  const remaining = tasks.filter((t) => !t.completed).length;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;
}

// ==========================================
// 4. EVENT DELEGATION for dynamic buttons
// ==========================================
const taskList = document.querySelector("#task-list");

taskList.addEventListener("click", (event) => {
  // DOM TRAVERSAL: Find the task item from any clicked child
  const taskItem = event.target.closest(".task-item");
  if (!taskItem) return;

  // DATA ATTRIBUTE: Get the task's unique ID
  const taskId = Number(taskItem.dataset.id);

  if (event.target.matches(".delete-btn")) {
    // Delete the task
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
  }

  if (event.target.matches(".complete-btn")) {
    // Toggle completed state
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    }
  }
});

// ==========================================
// 5. ADD new task
// ==========================================
const addBtn = document.querySelector("#add-btn");
const taskInput = document.querySelector("#task-input");

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(), // Unique ID based on timestamp
    text: text,
    priority: document.querySelector("#priority-select").value,
    completed: false,
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
});

// Allow Enter key to add task
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

// ==========================================
// 6. INITIALIZE: Render existing tasks on page load
// ==========================================
renderTasks();
