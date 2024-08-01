// Project Type Class
export enum ProjectStatus { Active, Finished }

export class Project {
  // using shorthand prop creation
  constructor(
    public id: string, 
    public title: string, 
    public description: string, 
    public people: number,
    public status: ProjectStatus, // using defined enum 
  ) {}
}