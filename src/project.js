export default class Project{

    constructor(projectName){
        this.name = projectName
        this.projectId = Project.incrementId()
        this.creationDate = new Date().toLocaleDateString()
        this.tasks = []
    }

    static incrementId(){
        if (!this.latestId && this.latestId != 0) this.latestId = 0
        else this.latestId++
        return this.latestId
    }

    setName(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    addTask(newTask){
        this.tasks.push(newTask)
    }

    removeTask(taskToRemove){
        // remove task from this.tasks
    }

}