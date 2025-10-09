import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-payment',
    standalone: true,
    templateUrl: './payment.component.html',
    imports: [
        FormsModule
    ],
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    constructor(private router: Router) {}

    pay() {
        // Aquí puedes simular un pago o integrar un servicio
        alert('Pago realizado con éxito ✅');
        this.router.navigate(['/login']);
    }
}
