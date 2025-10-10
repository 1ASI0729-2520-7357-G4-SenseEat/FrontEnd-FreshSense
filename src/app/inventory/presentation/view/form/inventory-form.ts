import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-inventory-form',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './inventory-form.html',
    styleUrls: ['./inventory-form.css'],
})
export class InventoryAddComponent {
    product = {
        name: '',
        description: '',
        category: '',
        quantity: 0,
        image: '',
    };

    categories = ['Fruit', 'Vegetable', 'Dairy', 'Grain', 'Meat', 'Snack'];

    constructor(
        private http: HttpClient,
        private router: Router,
        public route: ActivatedRoute
    ) {}

    onSubmit() {
        if (!this.product.name || !this.product.category) {
            alert('Please fill in the required fields.');
            return;
        }

        this.http.post('http://localhost:3000/products', this.product).subscribe({
            next: () => {
                alert('Product added successfully!');
                this.router.navigate(['/inventory']);
            },
            error: (err) => {
                console.error('Error saving product:', err);
                alert('Could not save product.');
            },
        });
    }

    cancel() {
        this.router.navigate(['/inventory']);
    }
}

