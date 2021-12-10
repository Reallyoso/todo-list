import { removeAllChildren, createProjectListElement, createProjectArray } from "./utils"


export function renderTodoList(_todoList){
    if (!(_todoList instanceof ToDoList)) throw Error("Input is not a TodoList Instance")     

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

export function render(){
    
}