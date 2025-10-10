import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Product = {
    id: number;
    name: string;
    image?: string;
    state?: string; // e.g. "In good condition", "Regular condition", etc.
    category?: string; // e.g. "Vegetables", "Fruits", etc.
    description?: string;
    quantity?: number; // <-- agregado (opcional)
};

@Component({
    selector: 'fs-inventory',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule, CommonModule, HttpClientModule],
    templateUrl: './inventory-list.html',
    styleUrls: ['./inventory.css']
})
export class FoodInventoryView implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    searchTerm = '';

    states = ['All', 'In good condition', 'Regular condition', 'Bad condition'];
    categories = ['All', 'Vegetables', 'Fruits', 'Lactates', 'Meats'];

    selectedState = 'All';
    selectedCategory = 'All';

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {
        this.http.get<any>('/db.json').subscribe((data) => {
            const raw = (data?.products ?? []) as any[];
            // Normalizamos: si no hay quantity, lo dejamos 0 (o null según prefieras)
            this.products = raw.map(p => ({
                id: p.id,
                name: p.name,
                image: p.image,
                state: p.state,
                category: p.category,
                description: p.description,
                quantity: typeof p.quantity === 'number' ? p.quantity : 0
            })) as Product[];

            this.filteredProducts = [...this.products];
        });
    }

    filterProducts() {
        const term = this.searchTerm.trim().toLowerCase();

        this.filteredProducts = this.products.filter((p) => {
            const stateMatch = this.selectedState === 'All' || p.state === this.selectedState;
            const categoryMatch = this.selectedCategory === 'All' || p.category === this.selectedCategory;
            const searchMatch = !term || p.name.toLowerCase().includes(term);
            return stateMatch && categoryMatch && searchMatch;
        });
    }
    // Add a trackBy function for *ngFor
    trackByProductId(index: number, item: { id: string | number }) {
        return item?.id ?? index;
    }

    // Handler for Add product button
    onAddProduct() {
        this.router.navigate(['/inventory/add']);
        // navigate to add product or open a modal
        // e.g. this.router.navigate(['/products', 'add']);
    }
    filterState(state: string) {
        this.selectedState = state;
        this.filterProducts();
    }

    filterCategory(category: string) {
        this.selectedCategory = category;
        this.filterProducts();
    }

    imageFor(p: Product) {
        return (
            p.image ||
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
        );
    }

    onImgError(ev: Event) {
        (ev.target as HTMLImageElement).src =
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    }
    selectedProduct: Product | null = null;
    // Handler for arrow button
    openProduct(p: Product) {
        if (this.selectedProduct && this.selectedProduct.id === p.id) {
            // Si ya está abierto, lo cierra
            this.selectedProduct = null;
        } else {
            // Muestra los detalles del producto seleccionado
            this.selectedProduct = p;
        }
    }

}
