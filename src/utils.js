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
    const listElement = createElement("li", ["project-li", `${name}-project`],`${name}`)
    const closeButton = createElement("span", "project-li-close")
    closeButton.innerHTML = "&times;"
    listElement.appendChild(closeButton)
    listElement.setAttribute("data", `${newProject.projectId}`)
    listElement.setAttribute("active", `false`)

    return listElement
}

