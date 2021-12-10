import ToDoList from "./toDoList"
import { removeAllChildren, createProjectListElement, createProjectArray, createTaskArray,filterTasksByDates } from "./utils"


export function renderTodoList(e,_todoList){
    if (!(_todoList instanceof ToDoList)) throw Error("Input is not a TodoList Instance")     
    console.log(e)
    const sidebarUL = document.querySelector(".project-ul")
    const mainView = document.querySelector(".view-container")

    removeAllChildren(sidebarUL)
    removeAllChildren(mainView)


    _todoList.projects.forEach((project)=>{
        const listElement = createProjectListElement(project) 
        const viewListElements = createProjectArray(project)

        sidebarUL.appendChild(listElement)
        viewListElements.forEach((e)=>mainView.appendChild(e))
    })

}

// export function render(_toDoList){
//     if(true){
//         const allProjectsContainingTaskToday = _toDoList.projects.filter(projects=>{
//             projects.filter(project=>project.tasks == "10.12.2021")
//         })
//     }
// }

export function renderToday(e){
    const toRender = createTaskArray(filterTasksByDates())
    const mainView = document.querySelector(".view-container")
    removeAllChildren(mainView)

    toRender.forEach(el=>mainView.appendChild(el))
}