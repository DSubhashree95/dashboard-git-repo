import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'bar-chart',
  standalone: true,
  template: '<canvas id="barChart"></canvas>',
})
export class BarChartComponent {
  @Input() data: number[] = [];

  ngOnInit() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
        datasets: [{ label: 'Commits', data: this.data, backgroundColor: '#42a5f5' }],
      },
    });
  }
}
