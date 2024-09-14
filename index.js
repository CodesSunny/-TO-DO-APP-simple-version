window.onload =()=>{
let inputBox = document.getElementById("input-task");
let addListBtn = document.getElementById("addlist-btn");
let tbody = document.getElementsByTagName("tbody")[0];
let taskTitle = "";
let editingRow = null;  //keep track of row being edited


function createRow(){
    let taskTr = document.createElement('tr');
    taskTr.innerHTML =`
    <td class="task-title"></td>
    <td>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    </td>
`;
          taskTitle = taskTr.querySelector(".task-title");
          taskTitle.textContent = inputBox.value;     
          tbody.append(taskTr); 
        //   select delete and edit buttons
    let deleteBtn = taskTr.querySelector(".delete");
    let editBtn = taskTr.querySelector(".edit");   
    deleteBtn.addEventListener("click",(e)=>deleteTask(e,taskTr)); //pass params to make them available outside function
    editBtn.addEventListener("click",(e)=>updateTask(e,taskTr));
};
          
// add task/ save task
addListBtn.addEventListener("click", (e)=>{
    e.preventDefault();  // prevent reloading
    if(addListBtn.innerText === "Save Changes"){
        saveTask();
    }else{
        addTask();
    }
});

function addTask(e){
    let inputValue = inputBox.value;

    if(inputBox.value ==""){
        alert("Pls add a task");
        return;    //no further code executes
      }
  
    let isDuplicate = false;  //initially assume no duplicate task

    // select all rows
    let allRows = tbody.querySelectorAll("tr");
    
    //loop each row to check duplicate task
    allRows.forEach((row) => {
        let currentTask = row.querySelector(".task-title").textContent;
        if(inputValue === currentTask){
            isDuplicate = true;                
        }
    });

    if(isDuplicate){
        alert("Task already existing...");
    }else{
        createRow();    //add row only when duplicate is not false
    }

    inputBox.value = "";

}


//  delete task
function deleteTask(e,taskTr){
    let deletableBtn = e.target.parentElement; //current button
    let deletableRow = deletableBtn.parentElement.parentElement; //current tr element
    deletableRow.remove();
}

// update task

function updateTask(e,taskTr){
    let editableTaskTitle = taskTr.querySelector(".task-title").textContent
    inputBox.value = editableTaskTitle;   //populate task in input field
    addListBtn.innerHTML = "Save Changes";
    addListBtn.style.fontSize = "22px";
    addListBtn.style.background = "hotpink";
    editingRow = taskTr;
}

// save changes
function saveTask() {
    if(editingRow){  
        editingRow.querySelector(".task-title").textContent = inputBox.value;
        addListBtn.innerText = "Add to List";
        addListBtn.style.background = "#17bdef";
        editingRow = null;
        inputBox.value = ""; 
    }
}
}