import { Role } from './role';

export type RolesBackResponse = [
  {
    role: Role[];
    token: string;
  }
];
