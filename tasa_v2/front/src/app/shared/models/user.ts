import { Role } from './role';

export interface User {
    id: number; // Only when is created
    age: number;
    email: string;
    last_name: string;
    name: string;
    phone: number;
    profesion: string;
    role_id: Role['key'];
}
