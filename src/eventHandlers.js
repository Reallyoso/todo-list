import {    checkProjectListForActiveProject, 
            createTaskArray, 
            sidebarButtons, 
            projectList,
            viewContainer,
            addButton,
            removeAllChildren
} from "./utils";

import { renderAProject, renderToday, renderProjectList, renderWeek } from "./render";

export function addTaskToProjectEvent(e){
    const taskName = prompt("Please enter TaskName: ")
    const taskDueDate = prompt("Please enter due date: ")

    const newTask = new Task(taskName, taskDueDate)
    // check for active project
    const activeProject = checkProjectListForActiveProject()
    console.log(activeProject)

    if (activeProject){
        const projectId = activeProject.attributes["project-data"].value
        const projectObject = defaultToDoList["projects"][projectId]
        projectObject.addTask(newTask)
        console.log("task added succesfully")

        renderAProject(defaultToDoList.projects[projectId])
    }else console.log("no active project found")
}

export function addProjectToTodoListEvent(e){
    console.log(e)
    const projectName = prompt("Enter Project Name: ")
    const newProject = new Project(projectName)

    

    defaultToDoList.addProject(newProject)
    renderProjectList(defaultToDoList)
    renderAProject(newProject)

    const projectListElements = Array.from(document.querySelector(".project-ul").children)

    // SET ACTIVE VALUE FOR EVERYTHING TO FALSE THEN FOR NEWLY RENDERED PROJECT TO TRUE
    projectListElements.forEach((el)=>el.attributes["active"].value = "false")
    projectListElements.at(-1).attributes.active.value = "true"

}

export function allTasksEvent(e){
    const projectListElements = Array.from(projectList.children)
    projectListElements.forEach((e)=>e.attributes.active.value = "false")
    removeAllChildren(viewContainer)
    const allProjectTaskArray = defaultToDoList.allTasks()
    createTaskArray(allProjectTaskArray).forEach((e)=>viewContainer.appendChild(e))
    console.log("rendered")
}

export function thisWeekEvent(e){
    document.querySelectorAll(".project-li").forEach((e)=>e.attributes.active.value = "false")
    renderWeek()
}

export function todayEvent(e){
    document.querySelectorAll(".project-li").forEach((e)=>e.attributes.active.value = "false")
    renderToday()
}

export function projectListClickEvent(e){
    if(e.target.tagName == "SPAN") {
        // return console.log("span")
        const conf = confirm("Are You Sure?")
        if(conf){
            const deletionDataValue = e.target.parentElement.attributes["project-data"].value
            // const projectToDelete = defaultToDoList.projects[deletionDataValue]
            defaultToDoList.removeProject(deletionDataValue)
            renderProjectList(defaultToDoList)
            removeAllChildren(viewContainer)
            addButton.remove()
        }
        return
    }

    if(e.type == "dblclick") {
        e.target.onblur = (e)=> {
            const changeNameDV = e.target.parentElement.attributes["project-data"].value
            defaultToDoList.projects[changeNameDV].setName(e.target.textContent)
            e.target.contentEditable = false
        }
        if(e.target.classList.contains("project-name")){
            e.target.contentEditable = true
            e.target.focus()
        }
        return
    }
    const projectListElements = Array.from(document.querySelector(".project-ul").childNodes)
    projectListElements.forEach((el)=>el.attributes["active"].value = "false")
    const dataValue = e.target.parentElement.attributes["project-data"].value
    const projectToRender = defaultToDoList.projects[dataValue]
    e.target.parentElement.attributes.active.value = "true"
    renderAProject(projectToRender, true)
}

export function removeTaskFromProjectEvent(e){
    const conf = confirm("Are you sure you want to Delete this?")
    if(conf){
        const projectId = e.target.parentElement.attributes["project-id"].value
        const taskId = e.target.parentElement.attributes["task-id"].value
        defaultToDoList.projects[projectId].removeTask(taskId)
        renderAProject(defaultToDoList.projects[projectId],true)
    }
}

// sidebarButtons[0].addEventListener("click", allTasksEvent)
// sidebarButtons[3].addEventListener("click", addProjectToTodoListEvent)
// addButton.addEventListener("click", addTaskToProjectEvent)


export function onBlur(e){
    const changedText = e.target.textContent
    const projectId = e.target.parentElement.attributes["project-id"].value
    const taskId = e.target.parentElement.attributes["task-id"].value
    // changes the objects name value 
    defaultToDoList.projects[projectId].setName(changedText)
}

export function onEnterBlur(e){
    if(e.key === "Enter"){
        e.preventDefault()
        e.target.blur()
    }
}