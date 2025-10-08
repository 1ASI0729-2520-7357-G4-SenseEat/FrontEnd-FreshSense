import { Component } from '@angular/core';

@Component({
    selector: 'fs-settings-view',
    standalone: true,
    template: `
        <section class="stub">
            <h2>Settings</h2>
            <p>Account & Subscription settings TBD.</p>
            <ul class="bullets">
                <li>Account info</li>
                <li>Language & Preferences</li>
                <li>Subscription plans</li>
            </ul>
        </section>
    `,
    styles: [`
        :host .stub{background:#fff;border:1px solid #e6ece8;border-radius:16px;padding:16px;}
        h2{margin:0 0 8px;}
        .bullets{margin-top:8px;color:#6b7f7b}
    `]
})
export class SettingsView {}