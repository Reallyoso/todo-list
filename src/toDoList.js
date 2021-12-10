export default class ToDoList{
    constructor(projects){
        this.projects = []
    }

    addProject(val){
        this.projects.push(val)
    }

    removeProject(val){
        // LOGIC HERE TO REMOVE PROJECT FROM PROJECT ARRAY, MAYBE SET UNDEFINED TO KEEP INDEX INTACT
    }

    allTasks(){
        const allProjectTasks = []
        this.projects.forEach((element)=>{
            element.tasks.forEach((e)=>allProjectTasks.push(e))
        })
        return allProjectTasks
    }
}