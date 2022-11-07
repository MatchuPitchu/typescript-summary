import { Component } from './base-component';
import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import { Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

// ProjectList Class
// specify Generics to <HTMLDivElement, HTMLElement> in order to indicate TS which types are meant now in Component class;
// this class acts as a target for drag and drop, so it implements also interface DragTarget
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];

  // I use shorthand in parantheses of constructor to create equally named props in class;
  // 1 parameter with essential information: active OR finished projects
  constructor(private type: 'active' | 'finished') {
    // pass Arguments to constructor of Component base class
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }
  // Note: convention of order to have first public methods and then private methods

  // change appearance of box or unordered list (use css class .droppable) to visualize that this is droppable area;
  // use decorator to ensure that "this" keyword is bound to surrounding class, NOT to event target obj
  @Autobind
  dragOverHandler(e: DragEvent) {
    // only allow drop action for 'text/plain'
    if(e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
      // preventDefault() is needed, only in this case drop is allowed and triggered on element;
      // explanation: JS's default is NOT to allow drop
      e.preventDefault();
      const listEl = this.renderEl.querySelector('ul')!;
      listEl.classList.add('droppable'); // change background color thanks to added class
    }
  }
  
  @Autobind
  dropHandler(e: DragEvent) {
    e.preventDefault(); // is needed (look above)
    const prjId = e.dataTransfer!.getData('text/plain');
    projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
  }
  
  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.renderEl.querySelector('ul')!;
    listEl.classList.remove('droppable'); // remove changed background color when cursor leaves area of an element
  }

  // projects list and filtering + register event listener functions
  configure() {
    // listeners for drag and drop functionality
    this.renderEl.addEventListener('dragover', this.dragOverHandler);
    this.renderEl.addEventListener('dragleave', this.dragLeaveHandler);
    this.renderEl.addEventListener('drop', this.dropHandler);

    // when projects state changed then update assignedProjects list
    projectState.addListener((projects: Project[]) => {
      // filter projects in 'active' and 'finished' before storing in assignedProjects arr
      const relevantProjects = projects.filter(prj => {
        if(this.type === 'active') return prj.status === ProjectStatus.Active;
          else return prj.status === ProjectStatus.Finished;
      })
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  // fill blank content in HTML template;
  // cannot be private because it's defined as abstract in Component base class
  renderContent() {
    const listId = `${this.type}-projects-list`;
    // select first ul element
    this.renderEl.querySelector('ul')!.id = listId;
    this.renderEl.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  // render projects
  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    // Problem: Duplicates - new projects + all existing projects are appended to list that contains already all existing projects;
    // since it's a small web project here, don't need performance intensive comparison which list elements are already listed;
    // simple solution: before every rendering, set listEl to empty string
    listEl.innerHTML = '';

    // loop through all project items in order to render all project obj items (look at "const newProject")
    for(const prjItem of this.assignedProjects) {
      // create new instance of ProjectItem class in ul element in which render new li project item
      new ProjectItem(this.renderEl.querySelector('ul')!.id, prjItem)
    }
  }
}