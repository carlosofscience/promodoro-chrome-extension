
let tasks = {}

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ?? {};
  //render tasks
  Object.keys(tasks).forEach((key) => {
    renderTask({ taskID: key, text: tasks[key].text });
  });

});
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const newTaskText = document.getElementById("newTaskText");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");

addTaskBtn.addEventListener("click", addNewTask)

function saveTasks() {

  console.log("saving tasks: ", tasks);
  chrome.storage.sync.set({ tasks });
}
function addNewTask() {
  if (newTaskText.value.length === 0) return;

  const taskID = Date.now();

  const task = { taskID, text: newTaskText.value }; 
  newTaskText.value = "";
  tasks[taskID] = { text: task.text };
  saveTasks()
  renderTask(task)
}

function renderTask({ taskID, text }) {
  console.log("rendering: ", taskID);
  //creating new tasks DOM
  let newTaskElm = document.createElement("div");
  newTaskElm.classList.add("task-field");
  newTaskElm.id = taskID;

  //tast text UI, event and logic
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = text;
  textInput.addEventListener("change", (e) => {
    tasks[taskID].text = textInput.value;
    saveTasks();
    console.log(tasks[taskID]);
  });

  //delete UI, event and logic
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", (e) => {
    console.log(taskID, tasks[taskID]);
    delete tasks[taskID];
    saveTasks();
    e.target.parentElement.remove();
    console.log(tasks);
  });

  newTaskElm.appendChild(textInput);
  newTaskElm.appendChild(deleteBtn);
  taskContainer.appendChild(newTaskElm);

  console.log(tasks);
}


startBtn.addEventListener('click', ()=>{
  console.log('staring timer');
  chrome.storage.local.set({isRunning: true})
})