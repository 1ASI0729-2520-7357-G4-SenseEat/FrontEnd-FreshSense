import { Injectable } from '@angular/core';
import { User } from '../domain/model/user.entity';

@Injectable({ providedIn: 'root' })
export class AccountStore {
    private users: User[] = [];

    register(user: User) {
        this.users.push(user);
        console.log('Usuario registrado:', user);
    }

    login(email: string, password: string): boolean {
        const found = this.users.find(u => u.email === email && u.password === password);
        if (found) {
            console.log('Inicio de sesión exitoso:', found);
            return true;
        } else {
            console.error('Credenciales incorrectas');
            return false;
        }
    }

    getAllUsers(): User[] {
        return this.users;
    }
}
