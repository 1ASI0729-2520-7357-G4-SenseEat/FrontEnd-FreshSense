import { Component } from '@angular/core';

@Component({
    selector: 'fs-reports-view',
    standalone: true,
    template: `
        <section class="stub">
            <h2>Reports</h2>
            <p>Coming soon…</p>
            <ul class="bullets">
                <li>Weekly food waste bar chart</li>
                <li>Gain/Loss KPIs and improvement %</li>
                <li>Humidity & temperature trends</li>
            </ul>
        </section>
    `,
    styles: [`
        :host .stub{background:#fff;border:1px solid #e6ece8;border-radius:16px;padding:16px;}
        h2{margin:0 0 8px;}
        .bullets{margin-top:8px;color:#6b7f7b}
    `]
})
export class ReportsView {}
