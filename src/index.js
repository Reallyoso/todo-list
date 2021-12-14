import Task from "./task"
import Project from "./project"
import ToDoList from "./toDoList.js"
import * as utils from "./utils"
import { sidebarButtons, projectList ,viewContainer, addButton, addTaskModal, addProjectModal} from "./utils"
import {renderTodoList, renderToday, renderWeek, renderAProject} from "./render"
import {allTasksEvent, addProjectToTodoListEvent, addTaskToProjectEvent, projectListClickEvent,
        thisWeekEvent, todayEvent,} from "./eventHandlers"
import { onFormSubmit } from "./modal"
import * as render from "./render"

const defaultTask = new Task("Default", "2021-12-01")
const defaultTaskTwo = new Task("Default", "2021-12-14")
const defaultProject = new Project("DefaultProject")
const defaultProjectTwo = new Project("DefaultProjectTwo")
const defaultToDoList = new ToDoList("DefaultToDoList")

defaultProject.addTask(defaultTask)
defaultProject.addTask(defaultTaskTwo)
defaultProject.addTask(defaultTask)
defaultProjectTwo.addTask(defaultTaskTwo)
defaultProjectTwo.addTask(defaultTask)
defaultProjectTwo.addTask(defaultTask)
defaultToDoList.addProject(defaultProject)
defaultToDoList.addProject(defaultProjectTwo)

renderTodoList(defaultToDoList)

// EventListeners Assignment START

const projectListElements = document.querySelectorAll(".project-li")
// projectListElements[0].firstElementChild.addEventListener("click", e=>{
//     console.log(e.target.parentElement.attributes["project-data"].value)
//     projectListClickEvent(e)
//     const dataValue = e.target.parentElement.attributes["project-data"].value

//     const projectToRender = defaultToDoList.projects[dataValue]

//     renderAProject(projectToRender)
// })



sidebarButtons[0].addEventListener("click",(e) => renderTodoList(defaultToDoList))
sidebarButtons[1].addEventListener("click", todayEvent)
sidebarButtons[2].addEventListener("click", thisWeekEvent)
sidebarButtons[3].addEventListener("click", ()=>addProjectModal.style.display = "block")
addButton.addEventListener("click", ()=>addTaskModal.style.display = "block")
document.getElementById("task-form").addEventListener("submit", onFormSubmit)
document.getElementById("project-form").addEventListener("submit",onFormSubmit)

// EventListeners Assignment END

// BY ASSIGNING GLOBAL VARIABLE TO CLASS/FUNCTION EXPOSE IT TO BE CALLABLE BY BROWSER CONSOLE
window.ToDoList = ToDoList
window.Project = Project
window.Task = Task
window.utils = utils
window.defaultToDoList = defaultToDoList
window.r = render
