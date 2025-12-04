import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../domain/model/user.entity';
import { AccountApis } from '../infrastructure/accounts-api';
import { AuthResponse } from '../infrastructure/account-response';

const CURRENT_USER_KEY = 'currentUser';

@Injectable({ providedIn: 'root' })
export class AccountStore {

    constructor(private readonly api: AccountApis) {}

    // Registro contra Spring Boot / MySQL
    async register(user: User): Promise<boolean> {
        try {
            // El backend espera: email, password, fullName
            const payload = {
                email: user.email,
                password: user.password,
                fullName: user.name,   // mapeamos name -> fullName
            };

            const resp = await lastValueFrom(this.api.register(payload));
            this.saveCurrentUser(resp);
            return true;
        } catch (err) {
            console.error('Error al registrar usuario', err);
            return false;
        }
    }

    // Login contra backend
    async login(email: string, password: string): Promise<boolean> {
        try {
            const resp = await lastValueFrom(this.api.login(email, password));
            this.saveCurrentUser(resp);
            return true;
        } catch (err) {
            console.error('Error al iniciar sesión', err);
            return false;
        }
    }

    async markAsPaid(email: string): Promise<void> {
        console.warn('[AccountStore] markAsPaid aún no implementado. Email:', email);
        return;
    }

    private saveCurrentUser(user: AuthResponse) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }

    getCurrentUser(): AuthResponse | null {
        const raw = localStorage.getItem(CURRENT_USER_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as AuthResponse;
        } catch {
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem(CURRENT_USER_KEY);
    }

    isLogged(): boolean {
        return this.getCurrentUser() !== null;
    }
}


