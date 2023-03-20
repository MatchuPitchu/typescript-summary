import { Component } from './base-component';
import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { Autobind } from '../decorators/autobind';

// ProjectItem Class
// responsible for rendering a single project item;
// implements interface Draggable to ensure needed functions to drag and drop items
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  // create prop to store a project into it
  private project: Project;

  // it's convention to define getters/setters above constructor;
  // getters are made to transform data, like in this case here
  get persons() {
    if(this.project.people === 1) return '1 person';
      else return `${this.project.people} persons` 
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    // store in constructor passed argument in project prop of class
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(e: DragEvent) {
    // attach data to an event with dataTransfer prop to ensure that dragged data is identical to dropped data;
    // so later on drop I'll be able to extract the data;
    // to save memory, transfer only project id (with data type 'text/plain') that is used later to refetch whole project obj
    e.dataTransfer!.setData('text/plain', this.project.id);
    e.dataTransfer!.effectAllowed = 'move'; // determines how cursor looks like and tells browser user's intention to move smth
  }

  // Don't need @Autobind here because don't use binded "this" in the function
  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() {
    this.renderEl.addEventListener('dragstart', this.dragStartHandler)
    this.renderEl.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.renderEl.querySelector('h2')!.textContent = this.project.title;
    // use getter for right naming of output; Note: getters are accessed like normal properties (without parantheses)
    this.renderEl.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.renderEl.querySelector('p')!.textContent = this.project.description;
  }
}