import { checkProjectListForActiveProject } from "./utils"
import { renderAProject,renderProjectList } from "./render"

const taskSubmitButton =  document.querySelector("#task-submit")
const projectSubmitButton = document.querySelector("#project-submit")

const taskNameInputField = document.querySelector("#task-name-input")
const taskDateInputField = document.querySelector("#task-date-input")
const projectNameInputField =  document.querySelector("#project-name-input")

function clearModalInputs(){
    taskNameInputField.value = ""
    taskDateInputField.value = ""
    projectNameInputField.value = ""
}
// Get the modal
const modalOne = document.getElementById("addTaskModal");
const modalTwo = document.getElementById("addProjectModal")

// Get the button that opens the modal
const taskBtn = document.querySelector("#add-task");

// Get the <span> element that closes the modal
const spanOne = document.getElementsByClassName("close")[0];
const spanTwo = document.getElementsByClassName("close")[1];
// When the user clicks on the button, open the modal
taskBtn.onclick = function() {
  modalOne.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanOne.onclick = function() {
  modalOne.style.display = "none";
  clearModalInputs()
}

spanTwo.onclick = function(){
    modalTwo.style.display = "none"
    clearModalInputs()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalOne || event.target == modalTwo) {
    modalOne.style.display = "none";
    modalTwo.style.display = "none";
    clearModalInputs()
  }
} 




export function onFormSubmit(e){
    if(e.target.id == "task-form"){
        const taskName = e.target[0].value
        const taskDueDate = e.target[1].value.split("-").reverse().join(".")
        modalOne.style.display = "none"
        clearModalInputs()

        const newTask = new Task(taskName, taskDueDate)
        // check for active project
        const activeProject = checkProjectListForActiveProject()
        console.log(activeProject)

        if (activeProject){
            const projectId = activeProject.attributes["project-data"].value
            const projectObject = defaultToDoList["projects"][projectId]
            projectObject.addTask(newTask)
            console.log("task added succesfully")

            renderAProject(defaultToDoList.projects[projectId],true)
        }else console.log("no active project found")
    }
    if(e.target.id == "project-form"){
        const projectName = e.target[0].value
        modalTwo.style.display = "none"

        const newProject = new Project(projectName)
    
        defaultToDoList.addProject(newProject)
        renderProjectList(defaultToDoList)
        renderAProject(newProject,true)

        const projectListElements = Array.from(document.querySelector(".project-ul").children)

        // SET ACTIVE VALUE FOR EVERYTHING TO FALSE THEN FOR NEWLY RENDERED PROJECT TO TRUE
        projectListElements.forEach((el)=>el.attributes["active"].value = "false")
        projectListElements.at(-1).attributes.active.value = "true"
    }
}

// taskSubmitButton.onsubmit = function(e){
//     console.log(e)
//     console.log(taskNameInputField.value)
//     console.log(taskDateInputField.value)
//     modal.style.display = "none"
//     clearModalInputs()
//     // renderProject
// }