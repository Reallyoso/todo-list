import ToDoList from "./toDoList"
import Project from "./project"
import Task from "./task"
import { projectListClickEvent } from "./eventHandlers"

export const sidebarButtons = document.querySelectorAll(".sidebar-button")
export const projectList = document.querySelector(".project-ul")
export const viewContainer = document.querySelector(".view-container")
export const addButton = document.getElementById("add-task")
export const addTaskModal = document.getElementById("addTaskModal")
export const addProjectModal = document.getElementById("addProjectModal")


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

// export function addEventListenersToListElements(){
//     const projectListElements = Array.from(projectList.children)

//     projectListElements.forEach((e)=>e.addEventListener("click", projectListClickEvent))
// }

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
        if(element == null || element == undefined){
            console.log("element is null/undefined")
        }else{
            const mainListElement = createElement("li", ["task-container"])
            const taskTextName = createElement("p", `${element.name}-paragraph task-text task-name`, `${element.name}`)
            const creationDate = createElement("p",`${element.name}-paragraph task-text task-creationdate`, `${element.creationDate}`)
            const taskTextDueDate = createElement("input", `${element.name}-paragraph task-text task-duedate`)
            taskTextDueDate.type = "date"
            taskTextDueDate.value = `${element.dueDate.toISOString().split("T")[0]}`
            const taskTextIsDone = createElement("p", `${element.name}-paragraph task-text task-isdone`, `${element.isDone}`)
            
            mainListElement.appendChild(taskTextName)
            mainListElement.appendChild(creationDate)
            mainListElement.appendChild(taskTextDueDate)
            mainListElement.appendChild(taskTextIsDone)
            domElementArray.push(mainListElement)
        }
    })

    return domElementArray
}


export function createProjectArray(aProject){
    if(!(aProject instanceof Project) && aProject != null){
        throw Error("Not a Instance of Project")
    }
    if(aProject == null) return
    const domElementArray = createTaskArray(aProject.tasks)
    const heading = createElement("h1", `view-project-heading`,`${aProject.name}`)
    domElementArray.unshift(heading)
    domElementArray.forEach((e,i)=>{
        e.setAttribute("project-id", `${aProject.projectId}`)
        if(e.classList.contains("task-container")){
            e.setAttribute("task-id", `${i-1}`)
        }
        e.classList.add(`${aProject.name}`)})

        return domElementArray
    }
    
export function createProjectListElement(newProject){
    if (!(newProject instanceof Project) && newProject != null) throw Error("Input is not a Project Instance")
    if(newProject == null) return
    const name = newProject.name
    const listElement = createElement("li", ["project-li", `${name}-project`])
    const projectLabel = createElement("p","project-name",`${name}`)
    const closeButton = createElement("span", "project-li-close")
    closeButton.innerHTML = "&times;"
    listElement.appendChild(projectLabel)
    listElement.appendChild(closeButton)
    listElement.setAttribute("project-data", `${newProject.projectId}`)
    listElement.setAttribute("active", `false`)
    listElement.addEventListener("click", projectListClickEvent )
    listElement.firstElementChild.addEventListener("dblclick", projectListClickEvent)

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
        if(e == null || e == undefined) return
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


//  Numerical Explanation of reassigning startDate to Monday in getCurrentWeek
// getDay =
//   +6  %7
// 0  6  6
// 1  7  0
// 2  8  1
// 3  9  2
// 4 10  3
// 5 11  4
// 6 12  5
// 7 13  6
// 8 14  0



export function getCurrentWeek(){
    const curr = new Date()
    // make the dayNr start on Monday: dayNr on Monday == 0, default is Monday == 1, Sunday == 0
    const dayNr = curr.getDate()-(curr.getDay()+6)%7
    let firstDay = new Date(curr.setDate(dayNr))
    firstDay = new Date(firstDay.setHours(0,0,0,0))
    let lastDay = new Date(curr.setDate(dayNr+6))
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
    
    const allTasksWeek = allTasks.filter((t)=>{
        if(t == null || t == undefined) return
        if (utils.isCurrentWeek(new Date(t.dueDate.split(".").reverse().join("/")).getTime())) return true
    })
    
    return allTasksWeek
}





// temp0.childNodes.forEach((el)=>el.addEventListener("blur", e=>console.log("element loses focus, write to projecttaskarray")))
// undefined
// temp0.childNodes.forEach((el)=>el.addEventListener("keypress",(e)=>{
//     if(e.key == "Enter"){
//           e.preventDefault()
//           e.blur()
//       console.log("enter pressed, remove focus from element")
//     }
//   }))