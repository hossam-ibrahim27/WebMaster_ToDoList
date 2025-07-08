//* Declare HTML Elements 
let addTaskField = document.getElementById("enter-task");
let addTaskButton = document.getElementById("add=task");
let tasksDiv = document.querySelector(".tasks");

//* Declare Array To Store Tasks
let arrayStoreTasks = [];
(window.localStorage.getItem("Tasks")) ? arrayOfTasks = JSON.parse(window.localStorage.getItem("Tasks")) : [];
getTasksFromLocalStorege();
// *******************************************************************************************************
//* Buttons Actions : Add Task , Delete , Toggle.
//* 1) Add Task Buuton: 
addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();  //* To Make Submit Stop Send Data
    if (addTaskField.value !== "" && addTaskField.value !== " ") {
        addTaskToArray(addTaskField.value); //* Add Task To Tasks (Array)
        addTaskField.value = "";
    } else {
        // tasksDiv.innerHTML = "Can't input Empty Value";
        // tasksDiv.classList.add("empty-value")
        EmptyNoTasks("Can't input Empty Value");
    }
});
// *******************************************************************************************************
//* Actions are : addTaskToArray , drawTasksInPage , drawTaksBody , DrawGetDataBody , EmptyLocalStorge

//* 1) addTaskToArray
let addTaskToArray = (tasktitle) => {
    //* Date.now() => Strong id and don't Make Conflict 
    let task = {
        id: Date.now(),
        title: tasktitle,
        completed: false,
    };
    arrayStoreTasks.push(task);  //* Push Task to Array Of tasks
    drawTasksInPage(arrayStoreTasks); //* Add Tasks To page
    storeTaskInLocalStorge(arrayStoreTasks); //* Add` Tasks To LocalStorege
}
//* 2) drawTasksInPage 
function drawTasksInPage(arrayStoreTasks) {
    tasksDiv.innerHTML = ""; //* Clear TasksBox Before Add Task
    arrayStoreTasks.forEach(task => {
        drawTaksBody(task, arrayStoreTasks);
    });
}
//* 3) drawTaksBody
function drawTaksBody(element, arrayStoreTasks) {
    //* Function Build This Formal ForEach Task From ArrayOfTasks 
    // <div class="task">
    //      <h2>Task one</h2>
    //       <div class="task-action">
    //            <input type="button" value="Toggle">
    //            <input type="button" value="Delete">
    //       </div>
    //  </div>
    //* create Task Div
    let taskBox = document.createElement("div");
    taskBox.setAttribute("class", "task");
    taskBox.setAttribute("id", element.id);

    //* create Task Title
    let taskTitle = document.createElement("h2");
    taskTitle.innerHTML = `${element.title}`;

    //* create Button Box
    let taskActionBox = document.createElement("div");  //* This Is Box of Buttons Toggle , Delete
    taskActionBox.setAttribute("class", "task-action");


    //* create Toggle Button
    let toggleButton = document.createElement("input");
    toggleButton.setAttribute("type", "button");
    toggleButton.setAttribute("value", "Toggle");
    toggleButton.setAttribute("class", "Toggle");

    //* create Delete Button
    let deleteButton = document.createElement("input");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("value", "Delete");
    deleteButton.setAttribute("class", "Delete");

    taskBox.appendChild(taskTitle); //* Add Title of task To TaskBox
    taskActionBox.appendChild(toggleButton); //* Add Toggle Button To TaskActionBox
    taskActionBox.appendChild(deleteButton); //* Add Delete Button To TaskActionBox
    taskBox.appendChild(taskActionBox); //* Add TaskActionBox To TaskBox
    tasksDiv.appendChild(taskBox); //* Add TaskBox To TasksDiv (Now Display in main Page)

    //* 2) Delete Button Action:
    deleteButton.addEventListener("click", () => {
        taskBox.remove(); //* Delete From Page
        let TasksFiltering = JSON.parse(window.localStorage.getItem("Tasks")); //* Get Data Lasted Stored In LocalStorege
        deleteTaskFromLocalStorge(TasksFiltering, element.id); //* Send Data To Filtring
    });

    //* 2) Toggle Button Action
    toggleButton.addEventListener("click", () => {
        for (let i = 0; i < arrayStoreTasks.length; i++) {
            if (arrayStoreTasks[i].id == element.id) {
                if (arrayStoreTasks[i].completed) {
                    element.completed = false;
                } else {
                    element.completed = true;
                }
                if (arrayStoreTasks[i].completed) {
                    taskTitle.classList.add("toggle");
                    console.log("Hossam2", arrayStoreTasks[i].completed);
                } else {
                    taskTitle.classList.remove("toggle");
                    console.log("Hossam3", arrayStoreTasks[i].completed);
                }
                storeTaskInLocalStorge(arrayStoreTasks);
            }
        }
    });
}
//* 4) DrawGetDataBody
function DrawGetDataBody(tasksParse) {
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
        drawTasksInPage(tasksParse, checkCompleted);
    });
}
//* 5) EmptyLocalStorge
function EmptyNoTasks(errorEmpty) {
    tasksDiv.innerHTML = errorEmpty;
    tasksDiv.classList.add("empty-value");
}
// *******************************************************************************************************
//* Local Storge Actions are : storeTaskInLocalStorge , Delete , Toggle , Get

//* 1) Add Task To LocalStorge From ArrayOfTasks
function storeTaskInLocalStorge(arrayOfTasks) {
    window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
};

//* 2) Delete Task From Local Storge
function deleteTaskFromLocalStorge(TasksFiltering, id) {
    TasksFiltering = TasksFiltering.filter((e) => e.id != id);
    storeTaskInLocalStorge(TasksFiltering);
}
//* 4) Get Recent Data From Local Storge.
function getTasksFromLocalStorege() {
    let data = window.localStorage.getItem("Tasks");
    let tasksParse;
    if (data !== "") {
        tasksParse = JSON.parse(data);
        DrawGetDataBody(tasksParse);
    }
}