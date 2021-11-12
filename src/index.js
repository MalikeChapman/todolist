import { projectModule } from "../src/project_factory.js";
import { taskModule} from "../src/tasks_factory.js";
import { dataModule } from "../src/data_management.js";

const domManip = (function (){
    const projectBtn = document.getElementById("createProject");
    const closeBtn = document.getElementById("closebtn");
    const createProjectBtn = document.getElementById("createbtn");
    const taskCloseBtn = document.getElementById("taskclosebtn");
    const addTaskBtn = document.getElementById("createTaskBtn");
    const createTaskBtn = document.getElementsByClassName("addTask");
    const selectList = document.getElementById("selectProject");
    const deleteProjectBtn = document.getElementById("deleteProject");
    const closeDeleteProject = document.getElementById("finishDeleteProjectMoadel");
    populateSelectList();
    populateProjectList();
    populateTaskOnLaunch();

//     const projectChildrenList = document.getElementById("list").childNodes;
//     for(let a = 0; a < projectChildrenList.length; a++){
//         projectChildrenList[a].addEventListener('click', displayCurrentProject(projectChildrenList[a].textContent));
//     }
  dataModule.checkTasks();



    


    projectBtn.addEventListener('click', displayCreateProject);
    closeBtn.addEventListener('click', closeCreateProject);
    createProjectBtn.addEventListener('click', getProjectName);
    addTaskBtn.addEventListener('click', displayCreateTasks);
    taskCloseBtn.addEventListener('click', closeCreateTasks);
    createTaskBtn[0].addEventListener('click', addTasksToMoadel);
    deleteProjectBtn.addEventListener('click', deleteThisProject);
    closeDeleteProject.addEventListener('click', () =>{
        const deleteProjectMoadel = document.getElementById("deleteProjectMoadelBtn");
        deleteProjectMoadel.style.visibility = "hidden";

    });


    function displayCreateProject(){
        const projectMoadel = document.getElementById("projectMoadel");
        projectMoadel.style.visibility = "visible";
    }
    function closeCreateProject(){
        const projectMoadel = document.getElementById("projectMoadel");
        projectMoadel.style.visibility = "hidden";

    }

    function getProjectName(){
        const inputElement = document.getElementById("projectName").value;
        let project = projectModule.projectFactory(inputElement);
        dataModule.addProject(project);
        addProjectToListItems(project);
        closeCreateProject();
        
    }

    function addProjectToListItems(project){
        const newListItem = document.createElement("li");
        newListItem.textContent = `${project.name}`;
        const projectList = document.getElementById('list');
        projectList.appendChild(newListItem);
    }

    function displayCreateTasks(){
        const taskMoadel = document.getElementById("createTaskMoadel");
        taskMoadel.style.visibility = "visible";
    }

    function closeCreateTasks(){
        const taskMoadel = document.getElementById("createTaskMoadel");
        taskMoadel.style.visibility = "hidden";
    }

    function addTasksToMoadel(){
        let newTask = taskModule.tasksFactory();
        dataModule.addTask(newTask);
        displayCurrentProject(newTask.projectName);

    }

    function populateSelectList(){
        let projectList = document.getElementById('list').childNodes;
        let storage = dataModule.returnLocalStorage();
        for(let i = 0; i < storage.length; i++){
            let optionValue = document.createElement('option');
            optionValue.setAttribute('value', `${storage[i].name}`);
            optionValue.textContent = `${storage[i].name}`;
            selectList.appendChild(optionValue);
        }


    }

    function populateProjectList(){
        const localValues = JSON.parse(localStorage.getItem('projects'));
        localValues.forEach(element => {
            addProjectToListItems(element);
           
        });

        const projectList = document.getElementById("list").childNodes;
        
        for(let i = 0; i < projectList.length; i++){
            projectList[i].addEventListener('click', displayProjectListener);
        }


    }


    function selectedTasks(){
        clearTasks();
        let obj = dataModule.returnLocalStorage();
        let project;
        console.log(this.textContent);
        console.log(obj[0].tasks.length);
        for(let i = 0; i < obj.length; i++){
            if(obj[i].name === this.textContent){
                project = obj[i];
                for(let j = 0; j < obj[i].tasks.length; j++){
                   
                    repopulateTasks(obj[i].tasks[j]);
                }
                break;
            }
        }
       
    }

    function repopulateTasks(task){
        const projectTasks = document.getElementById("projectTasks");
        let newDiv = document.createElement('div');
        newDiv.setAttribute("project", `${task.projectName}`);
        let ul = document.createElement("ul");
        let nameTitle = document.createElement("h4");
        let dateli = document.createElement("li");
        let daysLeftli = document.createElement("li");
        let currentDate = new Date();
        currentDate = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
        let date2 = new Date(task.taskDate);
        let difference = date2 - currentDate;
        let days = Math.round(difference / (1000 * 3600 * 24));
        daysLeftli.textContent = `${days} day till due date`;
        if(days <= 1){
            daysLeftli.style.color = "red";
        }

        nameTitle.textContent = `${task.name}`;
        dateli.textContent = `${task.taskDate}`;
        ul.appendChild(dateli);
        ul.appendChild(daysLeftli);
        newDiv.setAttribute('class', "flex-items");
        newDiv.appendChild(nameTitle);
        newDiv.appendChild(ul);
        const deleteTheTask = document.createElement("span");
        deleteTheTask.setAttribute("class", "material-icons-outlined");
        deleteTheTask.textContent = "delete";
        deleteTheTask.id = "deleteRadio";
        deleteTheTask.addEventListener('click', deleteTheTaskFromList);
        newDiv.appendChild(deleteTheTask);
        projectTasks.appendChild(newDiv);



    }

    function clearTasks(){
        const projectTasks = document.getElementById("projectTasks");
        let taskItems = projectTasks.querySelectorAll("div.flex-items");
        for(let i = 0; i < taskItems.length; i++){
            projectTasks.removeChild(taskItems[i]);
        }
    }

    function populateTaskOnLaunch(){
        let listOfProjects = dataModule.returnLocalStorage();
        for(let i = 0; i < listOfProjects.length; i++){
            if(listOfProjects[i].name === "default"){
                listOfProjects[i].tasks.forEach(element => repopulateTasks(element));
            }
        }
    }

    function displayCurrentProject(project){
        clearTasks();
        let obj = dataModule.returnLocalStorage();
        for(let i = 0; i < obj.length; i++){
            if(obj[i].name === project){
                for(let j = 0; j < obj[i].tasks.length; j++){
                    repopulateTasks(obj[i].tasks[j]);
                }
                break;
            }
        }
    }

    function displayProjectListener(){
        clearTasks();
        let obj = dataModule.returnLocalStorage();
        for(let i = 0; i < obj.length; i++){
            if(obj[i].name === this.textContent){
                for(let j = 0; j < obj[i].tasks.length; j++){
                    repopulateTasks(obj[i].tasks[j]);
                }
                break;
            }
        }




    }

    function taskOnClick(){
        const popUpTaskMoadel = document.getElementById("popUpTaskMoadel");
        popUpTaskMoadel.style.visibility = "visible";
        let elementList = popUpTaskMoadel.childNodes;

    }

    function deleteTheTaskFromList(){
        const parentDiv = this.parentNode;
        const listOfChildren = parentDiv.childNodes;
        let obj = {name: "", date: ""};
        
        for(let i = 0; i < listOfChildren.length; i++){
            if(listOfChildren[i].nodeName === "H4"){
                alert("this works");
                obj.name = listOfChildren[i].textContent;

            } else if(listOfChildren[i].tagName === "UL")
            {
                obj.date = listOfChildren[i].firstChild.textContent;
                break;
            }

        }
        dataModule.deleteTask(obj);
        const projectTasks = document.getElementById("projectTasks");
        projectTasks.removeChild(parentDiv);
        dataModule.checkTasks();

    }

    function deleteThisProject(){
        const deleteProjectMoadel = document.getElementById("deleteProjectMoadelBtn");
        deleteProjectMoadel.style.visibility = "visible";
        
        const selectProjectMoadel = document.getElementById("selectProjectMoadel");
        const finishBtn = document.getElementById("finishDeleteProjectMoadel");

        let storage = dataModule.returnLocalStorage();
        for(let i = 0; i < storage.length; i++){
            if(storage[i].name === "default") continue;
            let optionValue = document.createElement('option');
            optionValue.setAttribute('value', `${storage[i].name}`);
            optionValue.textContent = `${storage[i].name}`;
            selectProjectMoadel.appendChild(optionValue);
        }

        finishBtn.addEventListener('click', () => {
            let selectedTarget = selectProjectMoadel.options[selectProjectMoadel.selectedIndex].value;
            dataModule.deleteProject(selectedTarget);
            deleteProjectMoadel.style.visibility = "hidden";
            removeFromProjectList(selectedTarget);


        });

    }

    function removeFromProjectList(selectedTarget){
        const list = document.getElementById("list");
        const proj = list.childNodes;

        for(let i = 0; i < proj.length; i++){
            if(proj[i].textContent === selectedTarget){
                list.removeChild(proj[i]);
                break;
            }
        }

    }




})(document);