import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="summary-card">
      <mat-card-title>{{ title }}</mat-card-title>
      <mat-card-content>
        <h2>{{ value }}</h2>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent {
  @Input() title: string = '';
  @Input() value: number | string = '';
}
