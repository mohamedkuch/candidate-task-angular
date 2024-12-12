export class User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee';
  status: 'Active' | 'Inactive';
  joiningDate: Date;
  department?: string;
  location?: string;
  team?: string;
  schedule?: string;
  manager?: string;
  projects?: number;
  tasks?: number;
  teamMembers?: number;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.email = json.email;
    this.role = json.role;
    this.status = json.status;
    this.joiningDate = new Date(json.joiningDate);
    this.department = json.department || null;
    this.location = json.location || null;
    this.team = json.team || null;
    this.schedule = json.schedule || null;
    this.manager = json.manager || null;
    this.projects = json.projects || null;
    this.tasks = json.tasks || null;
    this.teamMembers = json.teamMembers || null;
  }
}
