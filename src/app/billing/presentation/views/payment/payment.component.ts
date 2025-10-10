import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-payment',
    standalone: true,
    templateUrl: './payment.component.html',
    imports: [FormsModule, TranslateModule], // ⬅️ agregado
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    constructor(private router: Router) {}

    pay() {
        alert('Pago realizado con éxito ✅');
        this.router.navigate(['/login']);
    }
}
