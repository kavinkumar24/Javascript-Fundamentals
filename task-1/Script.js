const input = document.getElementById("input");
const task_list = document.getElementById("task_list");

function getTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      createTaskElement(task.text, task.completed);
    });
  }
}

function createTaskElement(taskText, isCompleted = false) {
  const task_li = document.createElement("li");
  if (isCompleted) task_li.classList.add("checked");

  task_li.innerHTML = `
    ${taskText}
    <span>&times;</span>
    <button>Update</button>
  `;

  task_list.appendChild(task_li);
}

function createTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTaskElement(taskText);
  saveTasks();
  input.value = "";
}

function saveTasks() {
  const tasks = [];

  const taskItems = task_list.querySelectorAll("li");
  taskItems.forEach((taskItem) => {
    const taskText = taskItem.firstChild.textContent.trim();
    const isCompleted = taskItem.classList.contains("checked");
    tasks.push({ text: taskText, completed: isCompleted });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

task_list.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN") {
    e.stopPropagation();
    e.target.parentElement.remove();
    saveTasks();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveTasks();
  } else if (e.target.tagName === "BUTTON") {
    let current_task = e.target.parentElement.firstChild.textContent.trim();
    let new_task = prompt("Enter the new task", current_task);
    if (new_task === "") {
      alert("Please enter a task");
      return;
    } else if (new_task === null) return;

    e.target.parentElement.firstChild.textContent = new_task;
    saveTasks();
  }
});

getTasks();
