import { Component } from './base-component';
import { Validatable, validate } from '../util/validation';
import { Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state'

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')

    // get access to input form elements; 
    // I could move it into the configure function, makes no difference, BUT then TS would complain
    // that titleInputEl etc. aren't initialized in the constructor although they would also be indirectly
    this.titleInputEl = this.renderEl.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputEl = this.renderEl.querySelector('#description')! as HTMLInputElement;
    this.peopleInputEl = this.renderEl.querySelector('#people')! as HTMLInputElement;
    
    this.configure();
  }

  // methods are private because I never access these from outside the class
  // method which gathers all user input in a 3 items Tuple; 
  // use Union Type: return could also be "void", means that function has at least a branch which doesn't return any value
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputEl.value;
    const enteredDescription = this.descriptionInputEl.value;
    const enteredPeople = this.peopleInputEl.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    // simple input validation
    // if(
    //   enteredTitle.trim().length === 0 || 
    //   enteredDescription.trim().length === 0 || 
    //   enteredPeople.trim().length === 0
    // ) {

    // reusable validation functionality; if at least one check is false then display alert
    if(
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again');
      return
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // cannot be private because it's a defined as abstract in Component base class
  configure() {
    // "this" without .bind(this) points in submitHandler on the event target, not on the prop in my class; 
    // so value would be undefined; arg of bind() is here "this" (means class obj) to indicate that "this" inside of 
    // submitHandler will always refer to the same context than "this" in configure() (-> that means to class obj, NOT to event target)
    // this.renderEl.addEventListener('submit', this.submitHandler)

    // this line works only with autobind decorator in line above submitHandler (look below)
    this.renderEl.addEventListener('submit', this.submitHandler)
  }

  // this is technically not required, BUT to satisfy the Component base class, added with empty content
  renderContent() {}

  // reset inputs after submit form
  private clearInputs() {
    this.titleInputEl.value = '';
    this.descriptionInputEl.value = '';
    this.peopleInputEl.value = '';
  }

  // add event listeners to form button
  @Autobind // decorator to automatically bind "this" to class obj context
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    // check if return of gatherUserInput is arr
    if(Array.isArray(userInput)) {
      // use destructuring
      const [title, desc, people] = userInput;
      // create project with global available projectState obj and his public method addProject
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}