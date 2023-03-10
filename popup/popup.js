
let tasks = {}

const toggletBtn = document.getElementById("toggletBtn");
const timeLabel = document.getElementById("timeLabel");
const toggletBtnImg = document.querySelector("#toggletBtn img");
const restartBtn = document.getElementById("restartBtn");
const newTaskText = document.getElementById("newTaskText");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");
console.log(timeLabel);
//fetching data on popup load
chrome.storage.sync.get(["timer", "isRunning", "tasks"], (res) => {
  tasks = res.tasks ?? {};
  const isRunning = res.isRunning ?? false;

  //render tasks
  Object.keys(tasks).forEach((key) => {
    renderTask({ taskID: key, text: tasks[key].text });
  });
  toggletBtnImg.src = !isRunning ? "../assets/play.svg" : "../assets/pause.svg";
});

//updating time as soon popup shows up
updateUI();
setInterval(() => {
  updateUI();
}, 1000);

addTaskBtn.addEventListener("click", addNewTask)
restartBtn.addEventListener("click", ()=>{
  console.log("restarting timer");
  chrome.storage.local.set({
    timer: 0,
    isRunning: false
  })
  toggletBtnImg.src = "../assets/play.svg";
});



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


toggletBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], res =>{
    const isRunning = res.isRunning ?? false;
    chrome.storage.local.set({ isRunning: !isRunning }, ()=>{
        updateToggleButton(isRunning)
        console.log(isRunning ? "stopping" : "starting", "timer");
      });
    })
});

function updateUI() {
  chrome.storage.local.get(["timer", "timeout", "isRunning"], (res) => {
    updateTimeLabel(res.timer, res.timeout);
    updateToggleButton(res.isRunning);
  });
}

function updateTimeLabel(time, timeout) {
  const min = Math.round(timeout / 60) - Math.ceil(time / 60);
  const sec = (60 - (time % 60)) % 60;
  timeLabel.textContent =
    `${min}`.padStart(2, "0") + ":" + `${sec}`.padStart(2, "0");
}

function updateToggleButton(isRunning){
  toggletBtnImg.src = !isRunning ? "../assets/play.svg" : "../assets/pause.svg";
}



