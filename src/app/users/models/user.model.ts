export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee';
  status: 'Active' | 'Inactive';
  joiningDate: Date;
  // Optional fields
  department?: string;
  location?: string;
  team?: string;
  schedule?: string;
  manager?: string;
  projects?: number;
  tasks?: number;
  teamMembers?: number;
}
