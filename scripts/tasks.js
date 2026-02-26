const taskLists = document.querySelector("#task-list");

const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-btn");

const handleDelete = (event) => {
  if (event.target.matches(".delete-btn")) {
    const taskItem = event.target.closest(".task-item");
    taskItem.remove();
  }
};

// Delegation
taskLists.addEventListener("click", handleDelete);

const createTaskItem = (task) => {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.innerHTML = `<span>${task}</span><button class="delete-btn">Delete</button>`;
  return taskItem;
};

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  const taskItem = createTaskItem(task);
  taskLists.appendChild(taskItem);
  taskInput.value = "";
});
