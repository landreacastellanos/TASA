import { Role } from './role';

export interface UserCreate {
    age: number;
    email: string;
    last_name: string;
    name: string;
    password: string;
    phone: number;
    profesion: string;
    role_id: Role['key'];
}
