export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joiningDate: Date;
  // optional details
  department?: string;
  location?: string;
  team?: string;
  schedule?: string;
  manager?: string;
  projects?: number;
  tasks?: number;
  teamMembers?: number;
}
