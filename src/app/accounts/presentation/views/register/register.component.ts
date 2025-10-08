import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountStore } from '../../../application/accounts.store';
import { User } from '../../../domain/model/user.entity';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone:true,
    imports:[FormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: User = {
        name: '',
        email: '',
        password: ''
    };

    confirmPassword: string = '';

    constructor(private accountStore: AccountStore, private router: Router) {}
    goToLogin() {
        this.router.navigate(['/login']);
    }
    onSubmit() {
        if (this.user.password !== this.confirmPassword) {
            alert('Las contraseñas no coinciden ❌');
            return;
        }

        this.accountStore.register(this.user);
        alert('Usuario registrado correctamente ✅');
        this.router.navigate(['/login']);
    }
}


