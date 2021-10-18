import { projectModule } from "../src/project_factory.js";
import { taskModule} from "../src/tasks_factory.js";

const domManip = (function (){
    const projectBtn = document.getElementById("createProject");
    const closeBtn = document.getElementById("closebtn");
    const createProjectBtn = document.getElementById("createbtn");


    projectBtn.addEventListener('click', displayCreateProject);
    closeBtn.addEventListener('click', closeCreateProject);
    createProjectBtn.addEventListener('click', getProjectName);

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
        addProjectToListItems(project);
        closeCreateProject();
        
    }

    function addProjectToListItems(project){
        const newListItem = document.createElement("li");
        newListItem.textContent = `${project.name}`;
        const projectList = document.getElementById('list');
        projectList.appendChild(newListItem);
    }



})(document);