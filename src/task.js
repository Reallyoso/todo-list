export default class Task{
    constructor(name, dueDate){
        this.name = name
        // maybe add id
        // this.creationDateObject = new Date()
        this.creationDate = new Date().toLocaleDateString()
        this.dueDate = dueDate
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
        // set date after checking input
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