export default class Project{

    constructor(projectName){
        this.name = projectName
        this.projectId = Project.incrementId()
        this.creationDate = new Date().toLocaleDateString("de-DE")
        this.creationDateEpoch = new Date().getTime()
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

    removeTask(taskToRemoveId){
        this.tasks.splice(taskToRemoveId, 1)
    }

}