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
} from "./utils"
import { onEnterBlur, onBlur } from "./eventHandlers"

export function renderTodoList(_todoList){
    if (!(_todoList instanceof ToDoList)) throw Error("Input is not a TodoList Instance")     
    // console.log(e)
    const sidebarUL = document.querySelector(".project-ul")

    removeAllChildren(sidebarUL)
    removeAllChildren(viewContainer)
    addButton.remove()


    _todoList.projects.forEach((project)=>{
        const listElement = createProjectListElement(project) 
        const viewListElements = createProjectArray(project)

        sidebarUL.appendChild(listElement)
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
        const listElement = createProjectListElement(project)
        sidebarUL.appendChild(listElement)
    })
}

export function renderToday(){
    let toRender = createTaskArray(filterTasksToday())
    if (toRender.length == 0) console.log("toRender empty")
    removeAllChildren(viewContainer)
    addButton.remove()

    toRender.forEach(el=>viewContainer.appendChild(el))
}

export function renderWeek(){
    const toRender = createTaskArray(filterTasksWeek())

    removeAllChildren(viewContainer)
    addButton.remove()

    toRender.forEach(el=>viewContainer.appendChild(el))
}

export function renderAProject(project){
    const toRender = createProjectArray(project)
    removeAllChildren(viewContainer)
    document.querySelector("#content-container").appendChild(utils.addButton)
    toRender.forEach((el)=>{
        if(el.classList.contains("task-container")){
            el.childNodes.forEach((cn)=>{if(cn.classList.contains("task-name")) cn.contentEditable=true})
            el.childNodes[0].addEventListener("keypress", onEnterBlur)
            el.childNodes[0].addEventListener("blur", onBlur)
        }
    })

    toRender.forEach(el=>viewContainer.appendChild(el))
}