let tasks = JSON.parse(localStorage.getItem("taskflow_tasks")) || [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("taskflow_tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " done" : "");

    const name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.name;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Batal" : "Selesai";
    completeButton.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    actions.append(completeButton, deleteButton);
    li.append(name, actions);
    taskList.appendChild(li);
  });

  const completed = tasks.filter((task) => task.completed).length;

  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent =
    tasks.length - completed;

  document.getElementById("emptyMessage").style.display =
    tasks.length === 0 ? "block" : "none";
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = taskInput.value.trim();

  if (!name) return;

  tasks.push({
    name: name,
    completed: false,
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
});

renderTasks();
