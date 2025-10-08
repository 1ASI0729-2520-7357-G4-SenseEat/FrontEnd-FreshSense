import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/presentation/components/layout/layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
    },
    {
        path: 'register', loadComponent: () => import('./accounts/presentation/views/register/register.component').then(m => m.RegisterComponent)
    },
    { path: 'login', loadComponent: () => import('./accounts/presentation/views/login/login.component').then(m => m.LoginComponent)},
    { path: 'plan', loadComponent: () => import('./billing/presentation/views/plan/plan.component').then(m => m.PlanComponent)},
    { path: 'payment', loadComponent: () => import('./billing/presentation/views/payment/payment.component').then(m => m.PaymentComponent)},

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', loadComponent: () => import('./shared/presentation/view/home/home.view').then(m => m.HomeView) },
            { path: 'inventory', loadComponent: () => import('./inventory/presentation/inventory.view').then(m => m.InventoryView).catch(() => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView)) },
            { path: 'monitoring', loadComponent: () => import('./monitoring/presentation/monitoring.view').then(m => m.MonitoringView).catch(() => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView)) },
            { path: 'alerts', loadComponent: () => import('./alerts/presentation/alerts.view').then(m => m.AlertsView).catch(() => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView)) },
            { path: 'recipes', loadComponent: () => import('./recipes/presentation/recipes.view').then(m => m.RecipesView).catch(() => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView)) },
            { path: 'reports', loadComponent: () => import('./reports/presentation/reports.view').then(m => m.ReportsView).catch(() => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView)) },
            { path: 'achievements', loadComponent: () => import('./achievements/presentation/achievements.view').then(m => m.AchievementsView).catch(() => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView)) },
            { path: 'settings', loadComponent: () => import('./accounts/presentation/settings.view').then(m => m.SettingsView).catch(() => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView)) },

        ]
    },
    { path: '**', loadComponent: () => import('./shared/presentation/view/page-not-found/page-not-found.view').then(m => m.PageNotFoundView) }
];
