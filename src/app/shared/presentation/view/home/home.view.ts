import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'fs-home-view',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './home.view.html',
    styleUrl: './home.view.css'
})
export class HomeView {
    name = 'Luis';
}
