import {    checkProjectListForActiveProject, 
            createTaskArray, 
            sidebarButtons, 
            projectList,
            viewContainer,
            addButton,
            removeAllChildren
} from "./utils";


export function addTaskToProjectEvent(e){
    const taskName = prompt("Please enter TaskName: ")
    const taskDueDate = prompt("Please enter due date: ")

    const newTask = new Task(taskName, taskDueDate)
    // check for active project
    const activeProject = checkProjectListForActiveProject()
    console.log(activeProject)

    if (activeProject){
        const projectId = activeProject.attributes.data.value
        const projectObject = defaultToDoList["projects"][projectId]
        projectObject.addTask(newTask)
        console.log("task added succesfully")

        // RENDER TASK TO VIEW OF PROJECT
    }else console.log("no active project found")
}

export function addProjectToTodoListEvent(e){
    console.log(e)
    const projectName = prompt("Enter Project Name: ")
    const newProject = new Project(projectName)

    defaultToDoList.addProject(newProject)

}

export function allTasksEvent(e){
    const projectListElements = Array.from(projectList.children)
    projectListElements.forEach((e)=>e.attributes.active.value = "false")
    removeAllChildren(viewContainer)
    const allProjectTaskArray = defaultToDoList.allTasks()
    createTaskArray(allProjectTaskArray).forEach((e)=>viewContainer.appendChild(e))
    console.log("rendered")
}

function projectListClickEvent(e){
    if(e.target.tagName == "SPAN") return console.log("span")
    const projectListElements = Array.from(projectList.children)
    projectListElements.forEach((e)=>e.attributes.active.value = "false")
    e.target.attributes.active.value = "true"
    // NEEDS TO CONTAIN LOGIC TO RENDER ONLY THE PROJECTS TASKS TO VIEW

}

// sidebarButtons[0].addEventListener("click", allTasksEvent)
// sidebarButtons[3].addEventListener("click", addProjectToTodoListEvent)
// addButton.addEventListener("click", addTaskToProjectEvent)