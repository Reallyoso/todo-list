import Task from "./task"
import Project from "./project"
import ToDoList from "./toDoList.js"
import * as utils from "./utils"
import { sidebarButtons, projectList,viewContainer, addButton} from "./utils"
import {renderTodoList} from "./render"

const defaultTask = new Task("Default", "dueDate")
const defaultProject = new Project("DefaultProject")
const defaultProjectTwo = new Project("DefaultProjectTwo")
const defaultToDoList = new ToDoList("DefaultToDoList")

defaultProject.addTask(defaultTask)
defaultProject.addTask(defaultTask)
defaultProject.addTask(defaultTask)
defaultProjectTwo.addTask(defaultTask)
defaultProjectTwo.addTask(defaultTask)
defaultProjectTwo.addTask(defaultTask)
defaultToDoList.addProject(defaultProject)
defaultToDoList.addProject(defaultProjectTwo)

console.log(sidebarButtons)
console.log(viewContainer)


// BY ASSIGNING GLOBAL VARIABLE TO CLASS/FUNCTION EXPOSE IT TO BE CALLABLE BY BROWSER CONSOLE
window.ToDoList = ToDoList
window.Project = Project
window.Task = Task
window.utils = utils
window.defaultToDoList = defaultToDoList
window.renderTodoList = renderTodoList
