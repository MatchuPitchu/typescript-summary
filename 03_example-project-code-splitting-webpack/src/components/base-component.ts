// Component Base Class
// responsible for basic settings to render something on the screen;
// it's abstract class, cannot be instantiated directly, it's only for inheritance purposes;
// using Generics to set dynamically a) the place where I want to render something (-> T) and b) the element that I do render (-> U)
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T; // HTMLDivElement
  renderEl: U; // HTMLElement or HTMLFormElement

  constructor(
    templateId: string,
    hostElId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // use Type Casting to specify which exact HTML type I'll save here in variable
    this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostEl = document.getElementById(hostElId)! as T;

    // when creating new inherited class instance of this class, then save all HTML content (with deep clone, 
    // so all deeper levels -> that's why I set "true") in const what's inside HTML template element and 
    // then first child (-> e.g. form element) in the renderEl property of class
    const importedNode = document.importNode(this.templateEl.content, true);
    this.renderEl = importedNode.firstElementChild as U;
    // add id with stylings in app.css
    if (newElementId) this.renderEl.id = newElementId;

    this.attach(insertAtStart);
  }

  // add project list at the end of hostEl
  private attach(insertAtBeginning: boolean) {
    this.hostEl.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.renderEl);
  }

  // use abstract to force every class inheriting from Component to have these functions
  abstract configure(): void;
  abstract renderContent(): void;
}