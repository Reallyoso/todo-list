import ToDoList from "./toDoList"
import Project from "./project"
import Task from "./task"

export const sidebarButtons = document.querySelectorAll(".sidebar-button")
export const projectList = document.querySelector(".project-ul")
export const viewContainer = document.querySelector(".view-container")
export const addButton = document.getElementById("add-task")


export function createElement(name, classToAdd, elementTextContent = ""){
    if(Array.isArray(classToAdd)){
        classToAdd = classToAdd.join(" ")
    }
    const mainElement = document.createElement(`${name}`)
    if (classToAdd !== undefined) mainElement.classList = classToAdd
    mainElement.textContent = `${elementTextContent}`

    return mainElement
}

export function removeAllChildren(node){
    while(node.firstChild){
        node.removeChild(node.firstChild)
    }
}

export function findProjectIndexByName(_name, _todoList = theTODOLIST){
    _todoList.projects.forEach((element, index)=>{
        if (element.name == _name){
            console.log("found name at index: " + index)
        }else console.log("haven't found name")
    })
}

export function addEventListenersToListElements(){
    const projectListElements = Array.from(projectList.children)

    projectListElements.forEach((e)=>e.addEventListener("click", projectListClickEvent))
}

export function checkProjectListForActiveProject(){
    const projectListElements = Array.from(projectList.children)

    for (const e of projectListElements){
        if(e.attributes.active.value == "true"){
            console.log("found active element")
            return e
        }else{
            console.log("found no active element")
        }
    } 
}


// ELEMENT CREATION

export function createTaskArray(taskArr){
    if(!Array.isArray(taskArr)){
        throw Error("Expected Input is an Array.")
    }

    const domElementArray = []

    taskArr.forEach((element)=>{
        const mainListElement = createElement("li", ["task-container"])
        const taskTextName = createElement("p", `${element.name}-paragraph task-text`, `${element.name}`)
        const creationDate = createElement("p",`${element.name}-paragraph task-text`, `${element.creationDate}`)
        const taskTextDueDate = createElement("p", `${element.name}-paragraph task-text`, `${element.dueDate}`)
        const taskTextIsDone = createElement("p", `${element.name}-paragraph task-text`, `${element.isDone}`)
        mainListElement.appendChild(taskTextName)
        mainListElement.appendChild(creationDate)
        mainListElement.appendChild(taskTextDueDate)
        mainListElement.appendChild(taskTextIsDone)
        domElementArray.push(mainListElement)
    })

    return domElementArray
}


export function createProjectArray(aProject){
    if(!(aProject instanceof Project)){
        throw Error("Not a Instance of Project")
    }
    const domElementArray = createTaskArray(aProject.tasks)
    const heading = createElement("h1", `view-project-heading`,`${aProject.name}`)
    domElementArray.unshift(heading)
    domElementArray.forEach((e)=>{
        e.setAttribute("project-id", `${aProject.projectId}`)
        e.classList.add(`${aProject.name}`)})

        return domElementArray
    }
    
export function createProjectListElement(newProject){
    if (!(newProject instanceof Project)) throw Error("Input is not a Project Instance")
    const name = newProject.name
    const listElement = createElement("li", ["project-li", `${name}-project`])
    const projectLabel = createElement("p","project-name",`${name}`)
    const closeButton = createElement("span", "project-li-close")
    closeButton.innerHTML = "&times;"
    listElement.appendChild(projectLabel)
    listElement.appendChild(closeButton)
    listElement.setAttribute("project-data", `${newProject.projectId}`)
    listElement.setAttribute("active", `false`)

    return listElement
}

export function filterTasksToday(_toDoList=defaultToDoList){
    if(!(_toDoList instanceof ToDoList)) throw Error("Not an Instance of ToDoList")
    // const tempToDo = Object.assign({}, _toDoList)
    // const projects = tempToDo.projects
    // const projectArr = []
    
    // for(const project of projects){
    //     project.tasks = project.tasks.filter(task=>task.dueDate == "10.12.2021")
    //     projectArr.push(project)
    // }

    // tempToDo.projects = projectArr
    // return tempToDo


    // WORKING FOR TASKS ONLY NO CONNECTION TO PROJECT

    const allTasks = _toDoList.allTasks()
    const dateToday = new Date().toLocaleDateString("de-DE")
    const allTasksToday = allTasks.filter((e)=>{
        if(e.dueDate == dateToday) return true
    })
    return allTasksToday
}



// defaultToDoList.projects.filter((e)=>{
//     if (e.tasks.filter((r)=>{
//       if(r.dueDate == "10.12.2021") return true
//     }))return true
//   })


// defaultToDoList.projects.forEach((project)=>{
//     const test = project
//     test.task = test.filter((task)=>task.dueDate == "10.12.2021")
//     return test
// })

// for(project of defaultToDoList.projects){
//     const dummy = project
//     dummy.tasks = dummy.tasks.filter(task=>task.dueDate == "10.12.2021")
//     return dummy
// }

// export function testo(){
//     const tempToDo = new ToDoList()
//     let i = 0
//     for(const project of defaultToDoList.projects){
//         tempToDo.addProject(project)
//         const sa = defaultToDoList.projects[0].tasks.filter(t=>t.dueDate == "10.12.2021")
//         tempToDo.projects[i].tasks = sa
//         i++
//     }

//     return tempToDo
// }

export function getCurrentWeek(){
    const curr = new Date()
    const first = curr.getDate()-curr.getDay() + 1
    let firstDay = new Date(curr.setDate(first))
    firstDay = new Date(firstDay.setHours(0,0,0,0))
    let lastDay = new Date(curr.setDate(first+6))
    lastDay = new Date(lastDay.setHours(23,59,59,0))

    return{firstDay,lastDay}
}

export function isCurrentWeek(epochTime){
    const week = getCurrentWeek()
    if(epochTime >= week.firstDay.getTime() && epochTime<=week.lastDay.getTime()) return true
    else return false
}

export function filterTasksWeek(_toDoList = defaultToDoList){
    if(!(_toDoList instanceof ToDoList)) throw Error("Not an Instance of ToDoList")

    const allTasks = _toDoList.allTasks()
    
    const allTasksWeek = allTasks.filter(t=>utils.isCurrentWeek(new Date(t.dueDate.split(".").reverse().join("/")).getTime()))
    
    return allTasksWeek
}