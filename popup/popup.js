const tasks = []

const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");


addTaskBtn.addEventListener('click', addTask)


function addTask(){
  const index = tasks.length
  tasks.push("")
  const TaskItem = document.createElement("div")
  
  const textItem = document.createElement("input");
  textItem.type = "text";
  textItem.placeholder = "Enter a task description";
  textItem.addEventListener('change', ()=>{
    tasks[index] = textItem.value;
    console.log(tasks);
  })

  const deleteBtn = document.createElement("input");
  deleteBtn.type="button"
  deleteBtn.value="x"
  //deleting DOM element
  deleteBtn.addEventListener('click', (e)=>{
    tasks.splice(index, 1)
    e.target.parentNode.remove()
  })

  TaskItem.appendChild(textItem);
  TaskItem.appendChild(deleteBtn);

  taskContainer.appendChild(TaskItem)
  console.log('added task');
}