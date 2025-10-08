import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

type NavItem = { path: string; label: string; icon?: string };

@Component({
    selector: 'fs-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgFor
    ],
    templateUrl: './layout.html',
    styleUrl: './layout.css'
})
export class LayoutComponent {
    appTitle = 'FreshSense';
    collapsed = signal(false);

    nav = signal<NavItem[]>([
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/inventory', label: 'Food Inventory' },
        { path: '/monitoring', label: 'Food Monitoring' },
        { path: '/alerts', label: 'Alerts' },
        { path: '/recipes', label: 'Recipes' },
        { path: '/reports', label: 'Reports' },
        { path: '/achievements', label: 'Achievements' },
        { path: '/settings', label: 'Settings' },
    ]);

    toggle() { this.collapsed.update(v => !v); }
}
