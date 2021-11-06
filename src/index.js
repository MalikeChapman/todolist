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
    populateSelectList();
    populateProjectList();
    populateTaskOnLaunch();
    const projectULList = document.getElementById("list").childNodes;
    for(let i = 0; i < projectULList.length; i++){
        projectULList[i].addEventListener('click', selectedTasks);
    }


    


    projectBtn.addEventListener('click', displayCreateProject);
    closeBtn.addEventListener('click', closeCreateProject);
    createProjectBtn.addEventListener('click', getProjectName);
    addTaskBtn.addEventListener('click', displayCreateTasks);
    taskCloseBtn.addEventListener('click', closeCreateTasks);
    createTaskBtn[0].addEventListener('click', addTasksToMoadel);


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
        // const taskMoadel = document.getElementById("createTaskMoadel");
        // const projectTasks = document.getElementById("projectTasks");
        // taskMoadel.style.visibility = "hidden";
        // let newDiv = document.createElement('div');
        // let ul = document.createElement("ul");
        // let nameTitle = document.createElement("h4");
        // let dateli = document.createElement("li");
        // let daysLeftli = document.createElement("li");
        // let currentDate = new Date();
        // currentDate = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
        // let date2 = new Date(newTask.taskDate);
        // let difference = date2 - currentDate;
        // let days = Math.round(difference / (1000 * 3600 * 24));
        // daysLeftli.textContent = `${days} days till due date`;
        // if(days <= 1){
        //     daysLeftli.style.color = "red";
        // }


        // nameTitle.textContent = `${newTask.name}`;
        // dateli.textContent = `${newTask.taskDate}`;
        // ul.appendChild(dateli);
        // ul.appendChild(daysLeftli);
        // newDiv.setAttribute('class', "flex-items");
        // newDiv.appendChild(nameTitle);
        // newDiv.appendChild(ul);
        // projectTasks.appendChild(newDiv);

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



})(document);