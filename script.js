const input = document.getElementById("input");
const submit = document.getElementById("submit");
const list = document.getElementById("list-container");

//Get tasks from local storage
let tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

//Render task list with done and delete buttons
function renderTasks() {
  //If there are no tasks, display a message
  if (tasks.length === 0) {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.textContent = "There are no tasks to show";
    noTasksMessage.className = "no-tasks-message";
    list.appendChild(noTasksMessage);
    return;
  }

  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-container";

    const taskText = document.createElement("span");
    taskText.textContent = task.value;
    taskText.className = task.done ? "done" : "not-done";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";

    const doneButton = document.createElement("button");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.className = "done-button";
    doneButton.onclick = () => toggleDone(index);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = "delete-button";
    deleteButton.onclick = () => deleteTask(index);

    taskItem.appendChild(taskText);
    taskItem.appendChild(buttonsContainer);

    buttonsContainer.appendChild(doneButton);
    buttonsContainer.appendChild(deleteButton);

    list.appendChild(taskItem);
  });
}

//Toggle status of task
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

//Delete tasks
function deleteTask(index) {
  //Add class to animate deletion
  const taskItems = document.querySelectorAll(".task-container");
  const taskItem = taskItems[index];

  taskItem.classList.add("deleted-task");

  //Remove task from list after animation
  setTimeout(() => {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }, 1000);
}

// Add new task
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const value = input.value;
  if (!value) return;
  tasks.push({ value, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
});

// Initial render
renderTasks();

// Clear input field
input.value = "";
