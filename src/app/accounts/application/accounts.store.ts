import { Injectable } from '@angular/core';
import { User } from '../domain/model/user.entity';

@Injectable({ providedIn: 'root' })
export class AccountStore {
    private apiUrl = 'http://localhost:3000/users'; // json-server

    async register(user: User): Promise<boolean> {
        // Validar si el correo ya existe
        const existsRes = await fetch(`${this.apiUrl}?email=${user.email}`);
        const existingUsers = await existsRes.json();

        if (existingUsers.length > 0) return false; // ya existe

        // Registrar usuario con paid: false
        const newUser = { ...user, paid: false };
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        return response.ok;
    }

    async login(email: string, password: string): Promise<boolean> {
        const res = await fetch(`${this.apiUrl}?email=${email}&password=${password}`);
        const users = await res.json();

        // Solo usuarios que pagaron
        if (users.length === 1 && users[0].paid) {
            localStorage.setItem('user', JSON.stringify(users[0]));
            return true;
        }
        return false;
    }

    async markAsPaid(email: string): Promise<void> {
        const res = await fetch(`${this.apiUrl}?email=${email}`);
        const users = await res.json();

        if (users.length === 1) {
            const user = users[0];
            user.paid = true;

            await fetch(`${this.apiUrl}/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        }
    }

    logout() {
        localStorage.removeItem('user');
    }

    isLogged(): boolean {
        return localStorage.getItem('user') !== null;
    }
}


