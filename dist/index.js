/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data_management.js":
/*!********************************!*\
  !*** ./src/data_management.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dataModule\": () => (/* binding */ dataModule)\n/* harmony export */ });\n/* harmony import */ var _project_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project_factory.js */ \"./src/project_factory.js\");\n\n\nconst dataModule = (function (){\n    let storage = [];\n    let defaultProject = _project_factory_js__WEBPACK_IMPORTED_MODULE_0__.projectModule.projectFactory(\"default\");\n    let localLength = JSON.parse(localStorage.getItem('projects'));\n    if(localLength === 0){\n        storage.push(defaultProject);\n        localStorage.setItem('projects', JSON.stringify(storage));\n    \n\n    }\n    \n\n    const projectUL = document.getElementById(\"list\");\n    let projectList = projectUL.childNodes;\n\n    function addProject(project){\n        storage = JSON.parse(localStorage.getItem('projects'));\n        storage.push(project);\n        localStorage.setItem('projects', JSON.stringify(storage));\n    }\n\n    function addTask(task){\n        storage = JSON.parse(localStorage.getItem('projects'));\n       for(let i = 0; i < storage.length; i++){\n           if(storage[i].name === task.project){\n               storage[i].tasks.push(task);\n               break;\n           }\n\n       }\n       localStorage.setItem('projects', JSON.stringify(storage));\n        \n    }\n\n    function returnLocalStorage(){\n        let obj = JSON.parse(localStorage.getItem('projects'));\n        return obj;\n\n    }\n\n    return {addProject, addTask, returnLocalStorage}\n\n})(document)\n\n//# sourceURL=webpack://todolist/./src/data_management.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_project_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/project_factory.js */ \"./src/project_factory.js\");\n/* harmony import */ var _src_tasks_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/tasks_factory.js */ \"./src/tasks_factory.js\");\n/* harmony import */ var _src_data_management_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/data_management.js */ \"./src/data_management.js\");\n\n\n\n\nconst domManip = (function (){\n    const projectBtn = document.getElementById(\"createProject\");\n    const closeBtn = document.getElementById(\"closebtn\");\n    const createProjectBtn = document.getElementById(\"createbtn\");\n    const taskCloseBtn = document.getElementById(\"taskclosebtn\");\n    const addTaskBtn = document.getElementById(\"createTaskBtn\");\n    const createTaskBtn = document.getElementsByClassName(\"addTask\");\n    const selectList = document.getElementById(\"selectProject\");\n    populateSelectList();\n    populateProjectList();\n\n    \n\n\n    projectBtn.addEventListener('click', displayCreateProject);\n    closeBtn.addEventListener('click', closeCreateProject);\n    createProjectBtn.addEventListener('click', getProjectName);\n    addTaskBtn.addEventListener('click', displayCreateTasks);\n    taskCloseBtn.addEventListener('click', closeCreateTasks);\n    createTaskBtn[0].addEventListener('click', addTasksToMoadel);\n\n\n    function displayCreateProject(){\n        const projectMoadel = document.getElementById(\"projectMoadel\");\n        projectMoadel.style.visibility = \"visible\";\n    }\n    function closeCreateProject(){\n        const projectMoadel = document.getElementById(\"projectMoadel\");\n        projectMoadel.style.visibility = \"hidden\";\n\n    }\n\n    function getProjectName(){\n        const inputElement = document.getElementById(\"projectName\").value;\n        let project = _src_project_factory_js__WEBPACK_IMPORTED_MODULE_0__.projectModule.projectFactory(inputElement);\n        _src_data_management_js__WEBPACK_IMPORTED_MODULE_2__.dataModule.addProject(project);\n        addProjectToListItems(project);\n        closeCreateProject();\n        \n    }\n\n    function addProjectToListItems(project){\n        const newListItem = document.createElement(\"li\");\n        newListItem.textContent = `${project.name}`;\n        const projectList = document.getElementById('list');\n        projectList.appendChild(newListItem);\n    }\n\n    function displayCreateTasks(){\n        const taskMoadel = document.getElementById(\"createTaskMoadel\");\n        taskMoadel.style.visibility = \"visible\";\n    }\n\n    function closeCreateTasks(){\n        const taskMoadel = document.getElementById(\"createTaskMoadel\");\n        taskMoadel.style.visibility = \"hidden\";\n    }\n\n    function addTasksToMoadel(){\n        let newTask = _src_tasks_factory_js__WEBPACK_IMPORTED_MODULE_1__.taskModule.tasksFactory();\n        _src_data_management_js__WEBPACK_IMPORTED_MODULE_2__.dataModule.addTask(newTask);\n        const taskMoadel = document.getElementById(\"createTaskMoadel\");\n        const projectTasks = document.getElementById(\"projectTasks\");\n        taskMoadel.style.visibility = \"hidden\";\n        let newDiv = document.createElement('div');\n        let ul = document.createElement(\"ul\");\n        let nameTitle = document.createElement(\"h4\");\n        let dateli = document.createElement(\"li\");\n        let daysLeftli = document.createElement(\"li\");\n        let currentDate = Date.now();\n        let date2 = new Date(newTask.taskDate);\n        let difference = date2.getTime() - currentDate.getTime();\n        let days = difference / (1000 * 3600 * 24);\n        daysLeftli.textContent = `${days}`;\n\n        nameTitle.textContent = `${newTask.name}`;\n        dateli.textContent = `${newTask.taskDate}`;\n        ul.appendChild(dateli);\n        ul.appendChild(daysLeftli);\n        newDiv.setAttribute('class', \"flex-items\");\n        newDiv.appendChild(nameTitle);\n        newDiv.appendChild(ul);\n        projectTasks.appendChild(newDiv);\n\n    }\n\n    function populateSelectList(){\n        let projectList = document.getElementById('list').childNodes;\n        let storage = _src_data_management_js__WEBPACK_IMPORTED_MODULE_2__.dataModule.returnLocalStorage();\n        for(let i = 0; i < storage.length; i++){\n            let optionValue = document.createElement('option');\n            optionValue.setAttribute('value', `${storage[i].name}`);\n            optionValue.textContent = `${storage[i].name}`;\n            selectList.appendChild(optionValue);\n        }\n\n\n    }\n\n    function populateProjectList(){\n        const localValues = JSON.parse(localStorage.getItem('projects'));\n        localValues.forEach(element => {\n            addProjectToListItems(element);\n            console.log(element.name);\n        });\n\n\n    }\n\n    function addProjectListEventListener(){\n        const projectULList = document.getElementById(\"list\").childNodes;\n        for(let i = 0; i < projectULList.length; i++){\n            projectULList[i].addEventListener('click', selectedTasks);\n        }\n\n    }\n\n    function selectedTasks(){\n        let obj = _src_data_management_js__WEBPACK_IMPORTED_MODULE_2__.dataModule.returnLocalStorage();\n        let project;\n        for(let i = 0; i < obj.length; i++){\n            if(obj[i].name === this.textContent){\n                project = obj[i];\n                for(let j = 0; j < obj[i].tasks.length; j++){\n                    repopulateTasks(obj[i].tasks[j]);\n                }\n                break;\n            }\n        }\n       \n    }\n\n    function repopulateTasks(task){\n        const projectTasks = document.getElementById(\"projectTasks\");\n        let newDiv = document.createElement('div');\n        let ul = document.createElement(\"ul\");\n        let nameTitle = document.createElement(\"h4\");\n        let dateli = document.createElement(\"li\");\n        let daysLeftli = document.createElement(\"li\");\n        let currentDate = new Date();\n        currentDate = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);\n        let date2 = new Date(newTask.taskDate);\n        let difference = date2.getTime() - currentDate.getTime();\n        let days = difference / (1000 * 3600 * 24);\n        daysLeftli.textContent = `${days}`;\n\n        nameTitle.textContent = `${task.name}`;\n        dateli.textContent = `${task.taskDate}`;\n        ul.appendChild(dateli);\n        newDiv.setAttribute('class', \"flex-items\");\n        newDiv.appendChild(nameTitle);\n        newDiv.appendChild(ul);\n        projectTasks.appendChild(newDiv);\n\n\n\n    }\n\n\n\n})(document);\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ }),

/***/ "./src/project_factory.js":
/*!********************************!*\
  !*** ./src/project_factory.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectModule\": () => (/* binding */ projectModule)\n/* harmony export */ });\n\n\nconst projectModule = (function (){\n    function Project(name){\n        this.name = name;\n        this.tasks = [];\n    }\n\n    function createProject(name){\n        let obj = {name: \"\", tasks: []};\n        obj = new Project(name);\n        return obj;\n    }\n\n   \n    return { projectFactory: function ok(name){ return createProject(name)}};\n\n})();\n\n\n\n//# sourceURL=webpack://todolist/./src/project_factory.js?");

/***/ }),

/***/ "./src/tasks_factory.js":
/*!******************************!*\
  !*** ./src/tasks_factory.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskModule\": () => (/* binding */ taskModule)\n/* harmony export */ });\nconst taskModule = (function(){\n    function Tasks(name, description, taskDate, projectName){\n        this.name = name;\n        this.description = description;\n        this.taskDate = taskDate;\n        this.projectName = projectName;\n    \n    }\n    function createTask(name, description, taskDate, projectName){\n        let obj = {name: \"\", description: \"\", taskDate: \"\", projectName: \"\"};\n        obj = new Tasks(name, description, taskDate, projectName);\n        return obj;\n    }\n    function getTasksInfo(){\n        let taskName = document.getElementById(\"tasksName\").value\n        let taskDescription = document.getElementById(\"tasksDesc\").value;\n        let taskDate = document.getElementById(\"tasksDate\").value;\n        let selectList = document.getElementById(\"selectProject\");\n        let projectName = selectList.options[selectList.selectedIndex].value;\n\n        return createTask(taskName, taskDescription, taskDate, projectName);\n    }\n\n    return { tasksFactory: function ok(){ return getTasksInfo()}};\n})();\n\n\n\n//# sourceURL=webpack://todolist/./src/tasks_factory.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;