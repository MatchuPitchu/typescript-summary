import { Project, ProjectStatus } from '../models/project';

// define "type Listener" to encode a function type with one word; use "void" because listener fn don't need to return anything;
// use Generic Type to set a typ dynamically from outside
type Listener<T> = (items: T[]) => void;

// State base class to practice inheritance
class State<T> {
  // tell TS which Generic Type (here: <T>) the listeners use for this state object I create;
  // use "protected" that it can be accessed in inherited classes
  protected listeners: Listener<T>[] = []; // list of listener function references

  // possibility to store event listener functions in an array
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project State Management Class with Singleton (-> only one instance is allowed to exist)
// this class is managing projects, so Generic Type which is set is <Project> class
export class ProjectState extends State<Project>{
  private projects: Project[] = []; // arr of Project items
  private static instance: ProjectState;

  // set to private because class should be instantiated only once
  private constructor() {
    super();
  } 

  static getInstance() {
    if(this.instance) return this.instance;
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    // create new project and push it to projects list
    const newProject = new Project(
      Math.random().toString(), // id SHOULD be string; for random purposes: Math.random() is not unique, it's unlikely to have the same, but NOT excluded
      title,
      description,
      numOfPeople,
      ProjectStatus.Active, // using enum to set every created project first to status active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }
  
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    // only update if project with id found and new status is different from before
    if(project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }  
  }

  private updateListeners() {
    // loop through all stored listener functions and call them
    for(const listenerFn of this.listeners) {
      // a) use slice() to pass a new copy of the listeners arr, NOT only a reference to this listeners arr with this.projects;
      // it's better to avoid possible strange bugs
      // listenerFn(this.projects.slice())
      // b) use better ES6 way
      listenerFn([...this.projects])
    }
  }
}
// create global instance of ProjectState class with static method of class;
// now after I can use getInstance method globally
export const projectState = ProjectState.getInstance();
