import { projectModule } from "./project_factory.js";

export const dataModule = (function (){
    let storage = [];
    let defaultProject = projectModule.projectFactory("default");
    let localLength = JSON.parse(localStorage.getItem('projects'));
    if(localLength === 0){
        storage.push(defaultProject);
        localStorage.setItem('projects', JSON.stringify(storage));
    

    }
    

    const projectUL = document.getElementById("list");
    let projectList = projectUL.childNodes;

    function addProject(project){
        storage = JSON.parse(localStorage.getItem('projects'));
        storage.push(project);
        localStorage.setItem('projects', JSON.stringify(storage));
    }

    function addTask(task){
        storage = JSON.parse(localStorage.getItem('projects'));
       for(let i = 0; i < storage.length; i++){
           if(storage[i].name === task.projectName){
               storage[i].tasks.push(task);
               break;
           }

       }
       localStorage.setItem('projects', JSON.stringify(storage));
        
    }

    function returnLocalStorage(){
        let obj = JSON.parse(localStorage.getItem('projects'));
        return obj;

    }
    function checkTasks(){
        let obj = returnLocalStorage();
        for(let i = 0; i <obj.length; i++){
            console.log(obj[i].name);
            for(let j = 0; j < obj[i].tasks.length; j++){
                console.log(obj[i].tasks[j]);
            }
        }
    }

    function deleteTask(task){
        let obj = returnLocalStorage();
        for(let i = 0; i < obj.length; i++){
            for(let j = 0; j < obj[i].tasks.length; j++){
                if((obj[i].tasks[j].name === task.name) && (obj[i].tasks[j].taskDate === task.date)){
                    alert("we got here");
                    console.log(obj[i].tasks[j]);
                    obj[i].tasks.splice(j, 1);
                    console.log(obj[i].tasks[j]);
                    break;
                }
            }
        }
        storage = obj;
        localStorage.setItem('projects', JSON.stringify(storage));

    }

    function deleteProject(project){
        let obj = returnLocalStorage();
        for(let i = 0; i < obj.length; i++){
            if(obj[i].name === project){
                obj.splice(obj[i], 1);
                break;
            }
        }
        storage = obj;
        localStorage.setItem('projects', JSON.stringify(storage));

    }

    return {addProject, addTask, returnLocalStorage, checkTasks, deleteTask, deleteProject}

})(document)