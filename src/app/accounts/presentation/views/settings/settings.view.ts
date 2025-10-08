import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

type TabKey = 'profile' | 'preferences' | 'theme' | 'notifications' | 'security' | 'integrations';

interface SessionInfo { device: string; ip: string; lastActive: string; current?: boolean; }
interface Integration { key: string; name: string; connected: boolean; note?: string; }
interface Profile { name: string; email: string; phone: string; org: string; avatarUrl: string; }
interface Prefs { language: string; timezone: string; units: 'metric'|'imperial'; dateFormat: string; weekStartsOn: 'mon'|'sun'; }
interface Theme { mode: 'light'|'dark'|'system'; primary: string; rounded: boolean; density: 'comfortable'|'compact'; }
interface Notif { email: boolean; push: boolean; weeklyReport: boolean; criticalOnly: boolean; ethyleneThreshold: number; tempThreshold: number; }

@Component({
    selector: 'fs-settings-view',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf],
    templateUrl: './settings.view.html',
    styleUrls: ['./settings.view.css'],
})
export class SettingsView {
    // Tabs
    tabs: { key: TabKey; label: string; icon: string }[] = [
        { key: 'profile',       label: 'Profile',       icon: '👤' },
        { key: 'preferences',   label: 'Preferences',   icon: '⚙️' },
        { key: 'theme',         label: 'Theme',         icon: '🎨' },
        { key: 'notifications', label: 'Notifications', icon: '🔔' },
        { key: 'security',      label: 'Security',      icon: '🔒' },
        { key: 'integrations',  label: 'Integrations',  icon: '🔗' },
    ];
    active = signal<TabKey>('profile');
    setTab(k: TabKey){ this.active.set(k); }
    isActive = (k: TabKey) => this.active() === k;

    // Profile
    profile = signal<Profile>({
        name: 'Luis Martínez',
        email: 'luis@example.com',
        phone: '+51 999 999 999',
        org: 'FreshSense Labs',
        avatarUrl: '',
    });
    setProfile<K extends keyof Profile>(k: K, v: Profile[K]) {
        this.profile.set({ ...this.profile(), [k]: v });
        this.markDirty();
    }
    saveProfile(){ alert('Profile saved (frontend mock)'); }

    // Preferences
    prefs = signal<Prefs>({
        language: 'en',
        timezone: 'America/Lima',
        units: 'metric',
        dateFormat: 'DD/MM/YYYY',
        weekStartsOn: 'mon',
    });
    languages = ['en','es','pt','fr'];
    timezones = ['America/Lima','America/Mexico_City','America/Bogota','UTC'];
    setPrefs<K extends keyof Prefs>(k: K, v: Prefs[K]) {
        this.prefs.set({ ...this.prefs(), [k]: v });
        this.markDirty();
    }
    savePrefs(){ alert('Preferences saved (frontend mock)'); }

    // Theme
    theme = signal<Theme>({
        mode: 'system',
        primary: '#1f9c59',
        rounded: true,
        density: 'comfortable',
    });
    setTheme<K extends keyof Theme>(k: K, v: Theme[K]) {
        this.theme.set({ ...this.theme(), [k]: v });
        this.markDirty();
    }
    applyTheme(){ alert('Theme applied (frontend mock)'); }

    // Notifications
    notif = signal<Notif>({
        email: true,
        push: false,
        weeklyReport: true,
        criticalOnly: true,
        ethyleneThreshold: 0.5,
        tempThreshold: 6,
    });
    setNotif<K extends keyof Notif>(k: K, v: Notif[K]) {
        this.notif.set({ ...this.notif(), [k]: v });
        this.markDirty();
    }
    resetNotif(){
        this.notif.set({ email:true, push:false, weeklyReport:true, criticalOnly:true, ethyleneThreshold:0.5, tempThreshold:6 });
    }

    // Security
    twoFA = signal(false);
    sessions = signal<SessionInfo[]>([
        { device: 'Windows • Chrome', ip: '181.65.12.34', lastActive: 'Now', current: true },
        { device: 'iPhone • Mobile App', ip: '177.34.8.10', lastActive: '2d ago' },
        { device: 'MacOS • Safari', ip: '201.22.44.9', lastActive: '1w ago' },
    ]);
    changePassword(){ alert('Change password (frontend mock)'); }
    toggle2FA(){ this.twoFA.set(!this.twoFA()); }
    revokeSession(i: number){
        const arr = this.sessions().slice();
        const [s] = arr.splice(i,1);
        alert(`Session revoked: ${s.device}`);
        this.sessions.set(arr);
    }

    // Integrations
    integrations = signal<Integration[]>([
        { key:'google',   name:'Google',   connected:false, note:'Calendar & Drive export' },
        { key:'slack',    name:'Slack',    connected:true,  note:'#freshsense channel' },
        { key:'zapier',   name:'Zapier',   connected:false },
        { key:'webhooks', name:'Webhooks', connected:true,  note:'2 active hooks' },
    ]);
    connect(i: Integration){
        i.connected = !i.connected;
        this.integrations.set([...this.integrations()]);
    }

    // Unsaved changes flag
    dirty = signal(false);
    markDirty(){ this.dirty.set(true); }
    saveAll(){ this.dirty.set(false); alert('Settings saved (frontend mock)'); }
}
