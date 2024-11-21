import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'pie-chart',
  standalone: true,
  template: '<canvas id="pieChart"></canvas>',
})
export class PieChartComponent {
  @Input() data: { [key: string]: number } = {};

  ngOnInit() {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.data),
        datasets: [{ data: Object.values(this.data), backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'] }],
      },
    });
  }
}
