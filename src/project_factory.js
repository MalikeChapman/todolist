

export const projectModule = (function (){
    function Project(name){
        this.name = name;
        this.tasks = [];
    }

    function createProject(name){
        let obj = {name: "", tasks: []};
        obj = new Project(name);
        return obj;
    }

   
    return { projectFactory: function ok(name){ return createProject(name)}};

})();

