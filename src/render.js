import ToDoList from "./toDoList"
import {    removeAllChildren, 
            createProjectListElement, 
            createProjectArray, 
            createTaskArray,
            filterTasksToday,
            filterTasksWeek,
            sidebarButtons,
            projectList,
            viewContainer,
            addButton,
            createElement,
} from "./utils"
import { onEnterBlur, onBlur, removeTaskFromProjectEvent, dateBlur } from "./eventHandlers"

export function renderTodoList(_todoList){
    if (!(_todoList instanceof ToDoList)) throw Error("Input is not a TodoList Instance")     
    // console.log(e)
    const sidebarUL = document.querySelector(".project-ul")

    removeAllChildren(sidebarUL)
    removeAllChildren(viewContainer)
    addButton.remove()
    renderProjectList(_todoList)

    _todoList.projects.forEach((project)=>{
        if(project == null) return
        // const listElement = createProjectListElement(project) 
        
        const viewListElements = createProjectArray(project)
        
        viewListElements.forEach((el)=>{
            if(el.classList.contains("task-container")){
                el.childNodes.forEach((cn)=>{if(cn.classList.contains("task-name")) cn.contentEditable=true})
                el.childNodes[0].addEventListener("keypress", onEnterBlur)
                el.childNodes[0].addEventListener("blur", onBlur)
                el.childNodes[2].addEventListener("blur", dateBlur)
            }
        })

        // sidebarUL.appendChild(listElement)
        viewListElements.forEach((el)=>viewContainer.appendChild(el))
    })

}

// export function render(_toDoList){
//     if(true){
//         const allProjectsContainingTaskToday = _toDoList.projects.filter(projects=>{
//             projects.filter(project=>project.tasks == "10.12.2021")
//         })
//     }
// }

export function renderProjectList(_todoList){
    const sidebarUL = document.querySelector(".project-ul")

    removeAllChildren(sidebarUL)

    _todoList.projects.forEach(project=>{
        if(project == null) return
        const listElement = createProjectListElement(project)
        // listElement.firstElementChild.addEventListener("blur",(e)=>console.log(e))
        sidebarUL.appendChild(listElement)
    })
}

export function renderToday(){
    let toRender = createTaskArray(filterTasksToday())
    //set input datepicker to disabled bcs cba date picker is place 2 in taskarray, needs changing if taskarray changes
    toRender.forEach((task)=>task.childNodes[2].disabled = true) 
    if (toRender.length == 0) console.log("toRender empty")
    removeAllChildren(viewContainer)
    addButton.remove()

    toRender.forEach(el=>viewContainer.appendChild(el))
}

export function renderWeek(){
    const toRender = createTaskArray(filterTasksWeek())
    
    //set input datepicker to disabled bcs cba date picker is place 2 in taskarray, needs changing if taskarray changes
    toRender.forEach((task)=>task.childNodes[2].disabled = true) 

    removeAllChildren(viewContainer)
    addButton.remove()

    toRender.forEach(el=>viewContainer.appendChild(el))
}

export function renderAProject(project, addClose = false){
    const toRender = createProjectArray(project)
    if(addClose){
       
        toRender.forEach((tasklist)=>{
            if(tasklist.classList.contains("task-container")){
                const closeButton = createElement("span", "project-task-delete")
                closeButton.innerHTML = "&times;"
                closeButton.addEventListener("click", removeTaskFromProjectEvent)
                tasklist.appendChild(closeButton)
            }
        })
    }
    removeAllChildren(viewContainer)
    document.querySelector("#content-container").appendChild(utils.addButton)
    toRender.forEach((el)=>{
        if(el.classList.contains("task-container")){
            el.childNodes.forEach((cn)=>{if(cn.classList.contains("task-name")) cn.contentEditable=true})
            el.childNodes[0].addEventListener("keypress", onEnterBlur)
            el.childNodes[0].addEventListener("blur", onBlur)
            el.childNodes[2].addEventListener("blur", dateBlur)
        }
    })

    toRender.forEach(el=>viewContainer.appendChild(el))
}