import { Component, OnInit, inject } from '@angular/core';
import { GithubService } from '../service/github.service';
import { BarChartComponent } from '../shared/bar-chart.component';
import { PieChartComponent } from '../shared/pie-chart.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [BarChartComponent, PieChartComponent],
})
export class DashboardComponent implements OnInit {
  githubService = inject(GithubService);
  summary: any = {};
  commitsPerMonth: number[] = [];
  languages: { [key: string]: number } = {};

  ngOnInit() {
    const username = 'DSubhashree95'; // Replace with user input
    this.githubService.getUserInfo(username).subscribe((data) => {
      this.summary = {
        projects: data.public_repos,
        followers: data.followers,
        following: data.following,
      };
    });

    this.githubService.getRepos(username).subscribe((repos: any[]) => {
      repos.forEach((repo) => {
        this.githubService.getCommitActivity(username, repo.name).subscribe((activity) => {
          // Process commits per month
          for (const week of activity) {
            const month = new Date(week.week * 1000).getMonth();
            this.commitsPerMonth[month] = (this.commitsPerMonth[month] || 0) + week.total;
          }
        });

        this.githubService.getRepoLanguages(username, repo.name).subscribe((langs: { [key: string]: number }) => {
          for (const [lang, value] of Object.entries(langs)) {
            this.languages[lang] = (this.languages[lang] || 0) + value;
          }
        });        
      });
    });
  }
}
