import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-plan',
    standalone: true,
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.css']
})
export class PlanComponent {
    constructor(private router: Router) {}

    selectPlan(plan: string) {
        console.log('Plan seleccionado:', plan);
        // Puedes guardar el plan en un servicio compartido si quieres
        this.router.navigate(['/payment']);
    }
}
