export default class Task{
    constructor(name, dueDate){
        this.name = name
        // maybe add id
        this.creationDate = new Date().toLocaleDateString()
        this.creationDateEpoch = new Date().getTime()
        this.dueDate = new Date(dueDate)
        this.isDone = false
    }

    setName(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    setCreationDate(){
        // set date after checking input
    }

    getCreationDate(){
        return this.creationDate
    }

    setDueDate(date){
        this.dueDate = new Date(date)
    }

    getDueDate(){
        return this.dueDate
    }

    setIsDone(Bool){
        if(typeof Bool !== "boolean") return
        this.isDone = Bool 
    }

    getIsDone(){
        return this.isDone
    }
}