
let tasks = {}

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const newTaskText = document.getElementById("newTaskText");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");

addTaskBtn.addEventListener("click", addNewTask)

function addNewTask(){
  if (newTaskText.value.length === 0) return;

  const newTaskID = Date.now();

  //creating new tasks DOM
  let newTaskElm = document.createElement("div");
  newTaskElm.classList.add("task-field");
  newTaskElm.id = newTaskID;

  //tast text UI, event and logic
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = newTaskText.value;
  newTaskText.value = "";
  textInput.addEventListener("change", (e) => {
    tasks[newTaskID].text = textInput.value;
    console.log(tasks[newTaskID]);
  });

  //delete UI, event and logic
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    delete tasks[newTaskID];
    console.log(tasks);
  });

  newTaskElm.appendChild(textInput);
  newTaskElm.appendChild(deleteBtn);
  taskContainer.appendChild(newTaskElm);

  tasks[newTaskID] = { text: textInput.value };
  console.log(tasks);
}
