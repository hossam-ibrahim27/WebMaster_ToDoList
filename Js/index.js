//* Declare HTML Elements 
let addTaskField = document.getElementById("enter-task");
let addTaskButton = document.getElementById("add=task");
let tasksDiv = document.querySelector(".tasks");
// console.log(addTaskField);
// console.log(addTaskButton);
// console.log(tasksDiv);
//* Declare Array To Store Tasks
let arrayOfTasks = [];
(window.localStorage.getItem("Tasks")) ? arrayOfTasks = JSON.parse(window.localStorage.getItem("Tasks")) : [];
getTasksFromLocalStorege();
// *******************************************************************************************************
//* Buttons : Add Task , Delete , Toggle .
//* 1) Add Task Buuton: 
addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();  //* Stop Send Data
    if (addTaskField.value !== "") {
        addTaskToArray(addTaskField.value); //* Add Task To Tasks (Array)
        addTaskField.value = "";  //* To empty The Field
    } else {
        console.log("Error");
    }
});
//* Add Task To ArrayOfTasks 
let addTaskToArray = (taskText) => {
    let task = {
        //* Date.now() ==> To Forbidden Conflict id and Show The Date of Adding This Task
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    console.log(arrayOfTasks);
    arrayOfTasks.push(task);     //* Push Task to Array Of tasks
    addTaskToPage(arrayOfTasks);  //* Add Task To page
    addTaskToLocalStorege(arrayOfTasks) //* Add Task To LocalStorege
};
// ********************************************************************************************************
//* Add Task To Page From ArrayOfTasks
function addTaskToPage(arrayOfTasks, checkCompleted) {
    tasksDiv.innerHTML = "";
    //* Build This Formal ForEach Task From ArrayOfTasks 
    // <div class="task">
    //      <h2>Task one</h2>
    //       <div class="task-action">
    //            <input type="button" value="Toggle">
    //            <input type="button" value="Delete">
    //       </div>
    //  </div>
    arrayOfTasks.forEach((e) => {
        //* create Task Div
        let taskBox = document.createElement("div");
        taskBox.setAttribute("class", "task");
        taskBox.setAttribute("id", e.id);

        //* create Task Title
        let taskTitle = document.createElement("h2");
        taskTitle.innerHTML = `${e.title}`;

        //* create Button Box
        let taskActionBox = document.createElement("div");  //* This Is Box of Buttons Toggle , Delete
        taskActionBox.setAttribute("class", "task-action");

        //* create Toggle Button
        let toggleButton = document.createElement("input");
        toggleButton.setAttribute("type", "button");
        toggleButton.setAttribute("value", "Toggle");

        //* create Delete Button
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "Delete");

        taskBox.appendChild(taskTitle); //* Add Title of task To TaskBox
        taskActionBox.appendChild(toggleButton); //* Add Toggle Button To TaskActionBox
        taskActionBox.appendChild(deleteButton); //* Add Delete Button To TaskActionBox
        taskBox.appendChild(taskActionBox); //* Add TaskActionBox To TaskBox
        tasksDiv.appendChild(taskBox); //* Add TaskBox To TasksDiv (Now Display in main Page)
        // console.log(taskBox);
        console.log(e);
        //* 2) Delete Button Action
        deleteButton.addEventListener("click", () => {
            taskBox.remove(); //* Delete From Page
            deleteTaskFromLocalStorge(arrayOfTasks, e.id);
        });
        //* 2) Toggle Button Action
        toggleButton.addEventListener("click", () => {
            taskTitle.classList.toggle("toggle");
            toggleInLocalStorge(arrayOfTasks, e.id);
        });
        for (let i = 0; i < checkCompleted.length; i++) {
            if (checkCompleted[i].completed) {
                taskTitle.style.textDecoration = "line-through";
                taskTitle.style.color = "green";
            }
        }
    });
}
// ***********************************************************************************************************
//* Local Storge :
//* 1) Add Task To LocalStorge From ArrayOfTasks
let addTaskToLocalStorege = (arrayOfTasks) => {
    window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}

//* 2) Get Recent Data From Local Storge : Not Use Let To Can Access Before Declare
function getTasksFromLocalStorege() {
    let data = window.localStorage.getItem("Tasks");
    let tasksParse;
    (data !== "") ? tasksParse = JSON.parse(data) : "Empty Local Storge";

    //* create Task Div
    let taskBox = document.createElement("div");
    taskBox.setAttribute("class", "task");


    //* create ShowRecentTasksTitle
    let ShowRecentTasksTitle = document.createElement("h2");
    ShowRecentTasksTitle.innerHTML = "You Don't Input Any Task";

    //* create Button Box
    let taskActionBox = document.createElement("div");  //* This Is Box of Buttons Toggle , Delete
    taskActionBox.setAttribute("class", "task-action");

    //* create ShowRecentTasks Button
    let ShowRecentTasksButton = document.createElement("input");
    ShowRecentTasksButton.setAttribute("type", "button");
    ShowRecentTasksButton.setAttribute("value", "Show Recent Tasks");

    taskBox.appendChild(ShowRecentTasksTitle); //* Add Title of task To TaskBox
    taskActionBox.appendChild(ShowRecentTasksButton); //* Add Toggle Button To TaskActionBox
    taskBox.appendChild(taskActionBox); //* Add TaskActionBox To TaskBox
    tasksDiv.appendChild(taskBox); //* Add TaskBox To TasksDiv (Now Display in main Page)

    ShowRecentTasksButton.addEventListener("click", () => {
        tasksDiv.innerHTML = "";
        let checkCompleted = [];
        for (let i = 0; i < tasksParse.length; i++) {
            checkCompleted[i] = tasksParse[i].completed;
        }
        // console.log(checkCompleted);
        addTaskToPage(tasksParse, checkCompleted);
    });
}
//* Delete From Local Storge
function deleteTaskFromLocalStorge(arrayOfTasks, id) {
    arrayOfTasks = arrayOfTasks.filter((e) => e.id != id);
    addTaskToLocalStorege(arrayOfTasks);
}
//* Toggle From Local Storge
function toggleInLocalStorge(arrayOfTasks, id) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == id) {
            arrayOfTasks[i].completed = "true";
        }
    }
    addTaskToLocalStorege(arrayOfTasks);
}