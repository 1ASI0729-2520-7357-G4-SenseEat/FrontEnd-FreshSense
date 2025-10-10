import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type Severity = 'critical' | 'warning' | 'info';
type State = 'active' | 'muted' | 'resolved';

interface AlertCard {
    id: string;
    severity: Severity;
    state: State;
    title: string;
    message: string;
    source: 'Temp' | 'Humidity' | 'Ethylene' | 'Cleanliness' | 'Oxygen';
    timeAgo: string;
}

@Component({
    selector: 'fs-alerts-view',
    standalone: true,
    imports: [NgFor, NgIf, NgClass, FormsModule, TranslateModule], // ⬅️ agregado
    templateUrl: './alerts.view.html',
    styleUrls: ['./alerts.view.css'],
})
export class AlertsView {
    private _all = signal<AlertCard[]>([
        { id:'1', severity:'warning',  state:'active',   title:'High ethylene level', message:'Ethylene level has an exceed 0.5ppm', source:'Ethylene', timeAgo:'2m ago' },
        { id:'2', severity:'info',     state:'active',   title:'High temperature',    message:'The temperature is above 6° C',       source:'Temp',     timeAgo:'2m ago' },
        { id:'3', severity:'critical', state:'muted',    title:'Critical temperature',message:'Freezer above 10° C',                 source:'Temp',     timeAgo:'1h ago' },
        { id:'4', severity:'warning',  state:'resolved', title:'Cleanliness low',     message:'Below 80% threshold',                 source:'Cleanliness', timeAgo:'yesterday' },
    ]);

    tabs = [
        { key:'active' as State,   label:'Active' },
        { key:'muted' as State,    label:'Muted' },
        { key:'resolved' as State, label:'Resolved' },
        { key:'all' as const,      label:'All' },
    ];
    activeTab = signal<State|'all'>('active');
    query = signal('');
    sevFilter = signal<Severity|'all'>('all');

    visible = computed(() => {
        const q = this.query().toLowerCase();
        const tab = this.activeTab();
        const sev = this.sevFilter();
        return this._all().filter(a => {
            const okTab = tab==='all' ? true : a.state === tab;
            const okSev = sev==='all' ? true : a.severity === sev;
            const okQ = !q || a.title.toLowerCase().includes(q) || a.message.toLowerCase().includes(q);
            return okTab && okSev && okQ;
        });
    });

    resolve(a: AlertCard){ a.state = 'resolved'; this._all.set([...this._all()]); }
    mute(a: AlertCard){ a.state = 'muted'; this._all.set([...this._all()]); }

    openId = signal<string | null>(null);
    open(a: AlertCard){ this.openId.set(a.id); }
    close(){ this.openId.set(null); }
    isOpen(a: AlertCard){ return this.openId() === a.id; }
}
