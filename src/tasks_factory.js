export const taskModule = (function(){
    function Tasks(name, description, taskDate, projectName){
        this.name = name;
        this.description = description;
        this.taskDate = taskDate;
        this.projectName = projectName;
    
    }
    function createTask(name, description, taskDate, projectName){
        let obj = {name: "", description: "", taskDate: "", projectName: ""};
        obj = new Tasks(name, description, taskDate, projectName);
        return obj;
    }
    function getTasksInfo(){
        let taskName = document.getElementById("tasksName").value
        let taskDescription = document.getElementById("tasksDesc").value;
        let taskDate = document.getElementById("tasksDate").value;
        let selectList = document.getElementById("selectProject");
        let projectName = selectList.options[selectList.selectedIndex].value;

        return createTask(taskName, taskDescription, taskDate, projectName);
    }

    return { tasksFactory: function ok(){ return getTasksInfo()}};
})();

