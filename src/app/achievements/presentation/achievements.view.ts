import { Component, signal, computed } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';

type AchievementStatus = 'in-progress' | 'pending' | 'completed';

interface Achievement {
    id: string;
    icon: string;
    title: string;
    desc: string;
    progress?: number;
    status: AchievementStatus;
    pts: number;           // puntos que otorga
}

@Component({
    selector: 'fs-achievements-view',
    standalone: true,
    imports: [NgFor, NgIf, NgClass],
    templateUrl: './achievements.view.html',
    styleUrl: './achievements.view.css'
})
export class AchievementsView {
    // Mock data (puedes ajustar libremente)
    private readonly all = signal<Achievement[]>([
        { id:'a1', icon:'🎯', title:'Food Guardian', desc:'Maintain all items in good condition for 14 days.', status:'completed', pts:120 },
        { id:'a2', icon:'🥗', title:'Green Saver', desc:'Keep leafy greens under ideal humidity for 7 days.', status:'in-progress', progress:68, pts:80 },
        { id:'a3', icon:'🧊', title:'Cold Master', desc:'Keep average temp below 6°C for 5 consecutive days.', status:'in-progress', progress:34, pts:60 },
        { id:'a4', icon:'🍎', title:'Fruit Care', desc:'Avoid bruising score over 90% for a full week.', status:'pending', pts:70 },
        { id:'a5', icon:'🧼', title:'Cleanliness Pro', desc:'Keep cleanliness level above 85% for 10 days.', status:'in-progress', progress:85, pts:90 },
        { id:'a6', icon:'⏱️', title:'Quick Restock', desc:'Restock critical items in under 30 minutes.', status:'pending', pts:50 },
        { id:'a7', icon:'🧪', title:'Sensor Whisperer', desc:'Resolve 5 monitoring alerts without spoilage.', status:'pending', pts:100 },
        { id:'a8', icon:'🏆', title:'Weekly Champion', desc:'Finish a week with < 5% waste.', status:'completed', pts:140 },
    ]);

    readonly inProgress = computed(() => this.all().filter(a => a.status === 'in-progress'));
    readonly pending     = computed(() => this.all().filter(a => a.status === 'pending'));
    readonly completed   = computed(() => this.all().filter(a => a.status === 'completed'));

    // UI state
    readonly tabs: {key:AchievementStatus|'all', label:string}[] = [
        { key:'in-progress', label:'In-Progress' },
        { key:'pending',     label:'Pending' },
        { key:'completed',   label:'Completed' },
        { key:'all',         label:'All' }
    ];
    activeTab = signal<AchievementStatus|'all'>('in-progress');

    // Highlight (último completado)
    latestCompleted = computed(() => this.completed()[0] ?? this.all()[0]);

    // Derivados para contadores
    count = {
        inProgress: computed(() => this.inProgress().length),
        pending:    computed(() => this.pending().length),
        completed:  computed(() => this.completed().length),
        all:        computed(() => this.all().length),
    };

    // Lista visible por tab
    visible = computed(() => {
        const tab = this.activeTab();
        if (tab === 'in-progress') return this.inProgress();
        if (tab === 'pending')     return this.pending();
        if (tab === 'completed')   return this.completed();
        return this.all();
    });

    setTab(key:AchievementStatus|'all'){ this.activeTab.set(key); }

    // Formatea puntos
    pts(n:number){ return `${n} pts`; }
}
