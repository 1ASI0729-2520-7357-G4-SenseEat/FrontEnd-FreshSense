import { Component } from '@angular/core';

@Component({
    selector: 'fs-monitoring-view',
    standalone: true,
    template: `
        <section class="stub">
            <h2>Food Monitoring</h2>
            <p>Coming soon…</p>
            <ul class="bullets">
                <li>Humidity, ripeness, ethylene, cleanliness</li>
                <li>Weekly history & last monitoring log</li>
            </ul>
        </section>
    `,
    styles: [`
        :host .stub{background:#fff;border:1px solid #e6ece8;border-radius:16px;padding:16px;}
        h2{margin:0 0 8px;}
        .bullets{margin-top:8px;color:#6b7f7b}
    `]
})
export class MonitoringView {}
