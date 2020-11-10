import { Role } from './role';

export interface User {
    age: number;
    email: string;
    last_name: string;
    name: string;
    phone: number;
    profesion: string;
    role_id: Role['key'];
}
