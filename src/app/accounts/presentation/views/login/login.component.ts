import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountStore } from '../../../application/accounts.store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule, TranslateModule], // ⬅️ agregado
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginData = {
        email: '',
        password: ''
    };

    constructor(private accountStore: AccountStore, private router: Router) {}
    goToRegister() {
        this.router.navigate(['/register']);
    }
    onSubmit() {
        const success = this.accountStore.login(this.loginData.email, this.loginData.password);
        if (success) {
            alert('Inicio de sesión exitoso ✅');
            this.router.navigate(['/dashboard']);
        } else {
            alert('Correo o contraseña incorrectos ❌');
        }
    }
}
