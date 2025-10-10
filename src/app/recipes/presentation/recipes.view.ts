import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; // ⬅️ añadido

type Recipe = {
    id: number;
    title: string;
    image?: string;
    rating?: number;
    level?: string;
    type?: string;
    time?: string;
    ingredients?: string[];
    steps?: string[];
};

@Component({
    selector: 'fs-recipes-view',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule, TranslateModule],
    templateUrl: './recipes.view.html',
    styleUrls: ['./recipes.view.css']
})
export class RecipesView implements OnInit {
    recipes: Recipe[] = [];
    filteredRecipes: Recipe[] = [];
    searchTerm = '';
    levels = ['All', 'Easy', 'Intermediate', 'Advanced'];
    types = ['All', 'Breakfast', 'Meals', 'Desserts', 'Salads'];
    selectedLevel = 'All';
    selectedType = 'All';

    modalOpen = false;
    active: Recipe | null = null;

    private imageMap: Record<string, string> = {
        // Breakfast
        'waffles': 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'fruit-salad': 'https://images.pexels.com/photos/1105166/pexels-photo-1105166.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'avocado-toast': 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'pancake-stack': 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'smoothie-bowl': 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'omelette': 'https://images.pexels.com/photos/4109234/pexels-photo-4109234.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'yogurt-parfait': 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',

        // Meals
        'chicken-salad': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'quinoa-bowl': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'pasta-primavera': 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'grilled-salmon': 'https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'veggie-wrap': 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'turkey-burger': 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'chicken-stir-fry': 'https://images.pexels.com/photos/546945/pexels-photo-546945.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'beef-tacos': 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'veggie-tacos': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'chickpea-curry': 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'lentil-soup': 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'ramen-bowl': 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'poke-bowl': 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'mushroom-risotto': 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',

        // Desserts
        'banana-bread': 'https://images.pexels.com/photos/2092060/pexels-photo-2092060.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'chocolate-mousse': 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'tiramisu': 'https://images.pexels.com/photos/461431/pexels-photo-461431.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',

        // Salads
        'caesar-salad': 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'greek-salad': 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'caprese-salad': 'https://images.pexels.com/photos/3631/food-salad-healthy-tomatoes.jpg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'tuna-salad': 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1',
        'garden-salad': 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1'
    };

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get<any>('/db.json').subscribe((data) => {
            this.recipes = (data?.recipes ?? []) as Recipe[];
            this.filteredRecipes = [...this.recipes];
        });
    }

    filterRecipes() {
        const term = this.searchTerm.trim().toLowerCase();
        this.filteredRecipes = this.recipes.filter((r) => {
            const levelMatch = this.selectedLevel === 'All' || r.level === this.selectedLevel;
            const typeMatch  = this.selectedType  === 'All' || r.type  === this.selectedType;
            const searchMatch = !term || r.title.toLowerCase().includes(term);
            return levelMatch && typeMatch && searchMatch;
        });
    }
    filterLevel(level: string) { this.selectedLevel = level; this.filterRecipes(); }
    filterType(type: string)   { this.selectedType  = type;  this.filterRecipes(); }

    getStars(rating: number = 0) {
        const n = Math.max(0, Math.min(5, Math.floor(rating)));
        return Array(n).fill(0);
    }

    openRecipe(r: Recipe) {
        this.active = r;
        this.modalOpen = true;
        setTimeout(() => document.getElementById('closeModalBtn')?.focus(), 0);
        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        this.modalOpen = false;
        this.active = null;
        document.body.style.overflow = '';
    }
    @HostListener('window:keydown', ['$event'])
    onKeydown(ev: KeyboardEvent) {
        if (this.modalOpen && ev.key === 'Escape') this.closeModal();
    }

    imageFor(r: Recipe): string {
        if (r.image && r.image.trim()) return r.image;
        const slug = this.slug(r.title);
        const mapped = this.imageMap[slug];
        return mapped ?? this.defaultFoodImage();
    }

    onImgError(r: Recipe, ev: Event) {
        (ev.target as HTMLImageElement).src = this.defaultFoodImage();
    }

    private defaultFoodImage() {
        return 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=960&h=720&dpr=1';
    }

    private slug(s: string) {
        return (s || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
}
